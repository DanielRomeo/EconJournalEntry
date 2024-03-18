// components/MarkdownEditor.tsx
import React from "react";
import Markdown from "react-markdown"; // Direct import

interface MarkdownProps {
	value: string;
}

const MarkdownEditor: React.FC<MarkdownProps> = ({ value }) => {
	return (
		<div className="markdown-container">{<Markdown >{value}</Markdown>}</div>
	);
};

export default MarkdownEditor;
