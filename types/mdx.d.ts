// types/mdx.d.ts
declare module '*.md' {
  interface Props {
    components?: object
  }
  let MDXComponent: (props: Props) => JSX.Element
  export default MDXComponent
}
