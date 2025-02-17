import { AntdDivider, AntdSpace } from '@/lib/antd/components';
import { IWithChildren } from '@/types';
import { FullscreenExitOutlined, FullscreenOutlined, ReloadOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

export interface IZoomComponentProps extends IWithChildren{
    title?: React.ReactNode,
    onRefresh?: () => void,
    hideRefresh?: boolean
}

export const ZoomComponent = (({children, title, onRefresh, hideRefresh} : IZoomComponentProps) => {
    const [zoomed, setZoomed] = useState(false)
    const onTogglerZoom = () => {
        setZoomed((curr) => !curr)
    }
    const escFunction = useCallback((event : KeyboardEvent) => {
      if (event.key === "Escape") {
        //Do whatever when esc is pressed
        setZoomed(false)
      }
    }, []);
  
    useEffect(() => {
      document.addEventListener("keydown", escFunction, false);
  
      return () => {
        document.removeEventListener("keydown", escFunction, false);
      };
    }, [escFunction]);
  return (<div className={zoomed ? "zoom-in-component" : ""}>
      <>
      <Row align="middle" justify="space-between">
            <Col>
              {title}
            </Col>
            <Col>
              <AntdSpace>
                {hideRefresh ? null : <ReloadOutlined title="Tải lại" onClick={() =>onRefresh ? onRefresh():null} style={{ fontSize: '18px' }} />}
                {zoomed ?
                  <FullscreenExitOutlined title="Thoát toàn màn hình" style={{ fontSize: "18px" }} onClick={() => onTogglerZoom()} /> :
                  <FullscreenOutlined title="Toàn màn hình" onClick={() => onTogglerZoom()} style={{ fontSize: '18px' }} />
                }
              </AntdSpace>
            </Col>
          </Row>
        <AntdDivider />
        {children}
      </>
  </div>
  )
})
