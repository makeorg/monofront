function customTemplate(
  { template },
  opts,
  { imports, componentName, props, jsx }
) {
  return template.ast`
    ${imports}
    ${'\n'}
    export const ${componentName} = (${props}) => ${jsx}
  `;
}

module.exports = customTemplate;
