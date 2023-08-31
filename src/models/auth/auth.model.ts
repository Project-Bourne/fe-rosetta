// contains all type model for authentication pages 
import { ReactNode } from "react";

export interface AuthLayoutModel {
    children: ReactNode,
    logo: string,
    headerText: string,
    subText: string
}