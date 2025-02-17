import SplitterLayout, {SplitterLayoutProps} from 'react-splitter-layout'; //this library does not expose types, go to src/type.d.ts to override types

export const Spliter = (props: SplitterLayoutProps) => {
  const {children, ...rest} = props
  return (
    <SplitterLayout {...rest}>
      {children}
    </SplitterLayout>
  )
}
