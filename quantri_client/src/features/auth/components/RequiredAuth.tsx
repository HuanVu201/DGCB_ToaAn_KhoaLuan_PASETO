import { IWithChildren } from "../../../types";
import { Login } from ".";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { useState, useEffect } from "react";
import { IUser, UserType } from "@/features/user/models";
import { Navigate } from "react-router-dom";
import { Service } from "@/services";
import { RedirectUser } from "@/pages/routers/RedirectUser";
import { GetUser } from "@/features/user/redux/Actions";

export interface RequiredAuthProps extends IWithChildren { }

export interface RequiredAuthProps extends IWithChildren { }

export const RequiredAuth = ({ children }: RequiredAuthProps) => {
  const { data: auth } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      if (auth !== undefined) {
        await dispatch(GetUser({ token: auth.token })).unwrap()
      }
    })()
  }, [auth]);

  if (auth) {
    return children
  }

  return <RedirectUser />;
};
