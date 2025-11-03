export const flatTree = (categories) => {
  const result = [];

  const walk = (node) => {
    result.push({
      _id: node._id,
      name: node.name,
      slug: node.slug,
      parent: node.parent,
      children: node.children || []
    });

    if (node.children?.length) {
      node.children.forEach(child => walk(child));
    }
  };

  categories.forEach(top => walk(top));

  return result;
};