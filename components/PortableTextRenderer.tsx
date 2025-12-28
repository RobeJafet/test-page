import { PortableText, PortableTextProps } from "@portabletext/react";

const portableTextComponents: PortableTextProps["components"] = {
  block: {
    normal: ({ children }) => (
      <div >{children}</div>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <div className="number detail mb-2 mt-orange">
        {children}
      </div>
    ),
  },
  list: {
    number: ({ children }) => (
      <ol
        style={{
          paddingLeft: "1.5rem",
          marginBottom: "1rem",
          listStyleType: "decimal",
          listStylePosition: "inside",
        }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    number: ({ children }) => (
      <li style={{ marginBottom: "0.5rem" }}>{children}</li>
    ),
  },
};

const PortableTextRenderer = ({
  value,
}: {
  value: PortableTextProps["value"];
}) => {
  return <PortableText value={value} components={portableTextComponents} />;
};

export default PortableTextRenderer;
