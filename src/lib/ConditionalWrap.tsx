
type Wrappers = (false | null | undefined | ((children: any) => any))[];

export const conditionalWrap = (content: any, wrappers: Wrappers) => {
  let result = content;

  for (const wrapper of wrappers) {
    if (!wrapper) continue;
    result = wrapper({ children: result });
  }

  return result;
}

export const ConditionalWrap: React.FC<{
  content: React.ReactNode;
  wrappers: Wrappers;
}> = ({ content, wrappers }) => {
  let result = content;

  for (const wrapper of wrappers) {
    if (!wrapper) continue;
    result = wrapper({ children: result });
  }

  return result;
  
};
