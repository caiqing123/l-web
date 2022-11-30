export const handlerProps = (allowType, item, tmpArr) => {
  let data = [];
  const tran = {};
  const colors = {};
  if (allowType.includes(item.formType)) {
    data = tmpArr.map((dicItem) => {
      const label = dicItem[(item.dict.props && item.dict.props.label) || 'label'];
      const tmp = dicItem[(item.dict.props && item.dict.props.value) || 'code'];
      const value = typeof tmp === 'boolean' ? `${tmp}` : tmp;
      colors[value] = item.dict.tagColors && item.dict.tagColors[value] || undefined;
      tran[value] = label;
      return { label, value };
    });
  } else {
    data = tmpArr;
  }
  data.tran = tran;
  data.colors = colors;
  return data;
};
