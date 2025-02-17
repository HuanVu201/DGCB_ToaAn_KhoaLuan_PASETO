import { ConfigProvider, Steps } from "antd"
import { ComponentProps, useState } from "react";

export interface AntdStepProps extends ComponentProps<typeof Steps >{
}

export const AntdStep = (props: AntdStepProps) => {
    const {items,...rest} = props
    return <ConfigProvider theme={{
      components: {
        Steps: {
          colorTextDescription: "#000",
          colorPrimary:"#ce7a58",
          customIconFontSize: 48,
          titleLineHeight: 64,
        },
      },
    }}>
      <Steps
      
        items={props.items}
        responsive
        {...rest}
      />
    </ConfigProvider>
}