import { FormInstance } from 'antd';
import { type } from 'os';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    GoogleReCaptcha,
    GoogleReCaptchaProvider,
    useGoogleReCaptcha
} from 'react-google-recaptcha-v3';
import { AntdButton } from '../antd/components';
import axiosInstance from '../axios';
import { NavigateOptions } from 'react-router-dom';
import { SearchPublicConfig } from '@/features/config/redux/action';
import { useAppDispatch, useAppSelector } from '../redux/Hooks';

export type ReCapChaProps = { MaHoSo: string, MaCaptCha: string }
export type ReCaptChaWrapperProps = {
    form: FormInstance<ReCapChaProps>;
    handlerSearchQuery: (formData: Record<string, string>, navOpts?: NavigateOptions ) => void;
}

const YourReCaptchaComponent = ({ form, handlerSearchQuery}: ReCaptChaWrapperProps) => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    // Create an event handler so you can call the verification on button click event or form submit
    const handleReCaptchaVerify = useCallback(async () => {
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available');
        return;
      }
  
      const token = await executeRecaptcha('searchHoSo');
      
      form.setFieldValue("MaCaptCha", token)
      handlerSearchQuery({MaHoSo: form.getFieldValue("MaHoSo")})
      // Do whatever you want with the token
    }, [executeRecaptcha]);
  
    return <AntdButton onClick={handleReCaptchaVerify}>Tìm kiếm</AntdButton>

};


export const ReCapChaWrapper = (props: ReCaptChaWrapperProps) => {
  const {publicModule} = useAppSelector(state => state.config)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if(publicModule === undefined){
      dispatch(SearchPublicConfig())
    }
  }, [publicModule])
  const recaptchaSiteKey = useMemo(() => {
    return publicModule?.find(module => module.code === "recaptcha_site_key")?.content || ""
  }, [publicModule])
  if(!recaptchaSiteKey)
    return <></>
  return (
    <GoogleReCaptchaProvider  reCaptchaKey={recaptchaSiteKey}
    container={{
      parameters: {
        badge: undefined, 
        theme: undefined,
      }
    }}>
      <YourReCaptchaComponent {...props} />
    </GoogleReCaptchaProvider>
  )


}
