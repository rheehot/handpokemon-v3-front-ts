import React, { useContext, useCallback } from 'react';
import AppContext from '../../contexts/AppContext';
import SignInView from './SignInView';
import { Form } from 'antd';
import { getSnapshot } from 'mobx-state-tree';
import { WrappedFormInternalProps } from 'antd/lib/form/Form';
import MessageModal, {
  MessageModalType,
} from '../../components/MessageModal/MessageModal';
import { useHistory } from 'react-router';

const SignInContainer = ({ form }: WrappedFormInternalProps<any>) => {
  const { userStore } = useContext(AppContext);
  const history = useHistory();

  const handleOnClickLogin = useCallback(() => {
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          await userStore.signInUser(values);
        } catch (error) {
          return MessageModal({
            type: MessageModalType.error,
            content: error.message,
          });
        }
        if (history.length > 1) history.go(-1);
        else history.push('/');
      }
    });
  }, [form, history, userStore]);

  return (
    <SignInView
      form={form}
      isLoading={getSnapshot(userStore).isUserLoading}
      onClickLogin={handleOnClickLogin}
    />
  );
};

export default Form.create()(SignInContainer);
