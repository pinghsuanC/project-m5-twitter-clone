function handleRetweet(setP, p, setPN, pn) {
  setP(!p);
  if (p) {
    setPN(pn - 1);
  } else {
    setPN(pn + 1);
  }
  return;
}
function handleLike(setP, p, setPN, pn) {
  setP(!p);
  if (p) {
    setPN(pn - 1);
  } else {
    setPN(pn + 1);
  }
  return;
}

export { handleRetweet, handleLike };
