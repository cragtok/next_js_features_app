interface Props {
    text: string;
}
const PathWithBreaks = ({ text }: Props) => {
    const brokenPathString = text.replace(/\//g, "/<wbr/>");
    return <span dangerouslySetInnerHTML={{ __html: brokenPathString }} />;
};

export default PathWithBreaks;
