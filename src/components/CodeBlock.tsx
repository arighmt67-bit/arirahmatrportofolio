import { CopyButton } from "./ClientButtons";

export default function CodeBlock({ file, body }: { file: string; body: string }) {
  return (
    <figure className="code-block">
      <figcaption className="flex items-center justify-between gap-3 border-b px-4 py-2 font-mono text-xs">
        <span>{file}</span>
        <CopyButton text={body} />
      </figcaption>
      <pre className="max-h-[48vh] overflow-auto p-4 font-mono text-[13px] leading-relaxed">
        <code>
          {body.split("\n").map((line, k) => (
            <span key={k} className={/^\s*(#|\/\/)/.test(line) ? "text-[#8e8e93]" : undefined}>
              {line}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
