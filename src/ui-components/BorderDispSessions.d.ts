/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { ButtonProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BorderDispSessionsOverridesProps = {
    BorderDispSessions?: PrimitiveOverrideProps<ViewProps>;
    DisplaySessionsNew?: PrimitiveOverrideProps<ViewProps>;
    Type?: PrimitiveOverrideProps<TextProps>;
    "2020/10/10"?: PrimitiveOverrideProps<TextProps>;
    "Frame 2"?: PrimitiveOverrideProps<ViewProps>;
    Button38759835?: PrimitiveOverrideProps<ButtonProps>;
    Button38759836?: PrimitiveOverrideProps<ButtonProps>;
    Button38759837?: PrimitiveOverrideProps<ButtonProps>;
    Button38759838?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type BorderDispSessionsProps = React.PropsWithChildren<Partial<ViewProps> & {
    session?: any;
} & {
    overrides?: BorderDispSessionsOverridesProps | undefined | null;
}>;
export default function BorderDispSessions(props: BorderDispSessionsProps): React.ReactElement;
