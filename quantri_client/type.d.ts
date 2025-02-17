

declare module 'react-splitter-layout' {
    export interface SplitterLayoutProps extends React.ComponentProps<"div">{
        children?: React.ReactNode;
        customClassName?: string,
        vertical?: boolean = false,
        percentage?: boolean = false,
        primaryIndex?: number = 0,
        primaryMinSize?: number = 0,
        secondaryMinSize?: number,
        secondaryInitialSize?: number,
        onDragStart?: (e:any) => void
        onDragEnd?: (e:any) => void
        onSecondaryPaneSizeChange?: (e:any) => void
    }
    const SplitterLayout = (props: SplitterLayoutProps):React.ReactNode => any
    export default SplitterLayout
}
declare module "*.html" {
    const content: string;
    export default content;
}


// declare function CustomFormBuilder(props: any): any;
// declare module CustomFormBuilder{
//     namespace defaultProps {
//         export const options: {};
//         export { FormioFormBuilder as Builder };
//     }
//     namespace propTypes {
//         export type Display = 'form' | "wizard" | "pdf"
//         export type Schema = {display: Display, components: any[]}
//         export const form: any;
//         const options_1: any;
//         export { options_1 as options };
//         export const onSaveComponent: any;
//         export const onUpdateComponent: any;
//         export const onDeleteComponent: any;
//         export const onCancelComponent: any;
//         export const onEditComponent: any;
//         export const Builder: any;
//         export const onChange:(schema: Schema) => void 
//     }
// }