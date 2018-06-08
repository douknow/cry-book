let filenames = [
  'chapter0.xhtml',
  'chapter1.xhtml',
  'chapter11.xhtml',
  'chapter2.xhtml',
  'chapter111.xhtml',
  'chapter39.xhtml'
];

filenames = filenames.sort((a, b) => {
  console.log(a.split('.')[0].replace('chapter', ''));
  return (
    a.split('.')[0].replace('chapter', '') >
    b.split('.')[0].replace('chapter', '')
  );
});

filenames.forEach(v => console.log(v));
