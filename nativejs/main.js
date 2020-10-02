const add = document.querySelector('.add');
const addTen = document.querySelector('.addTen');
const sub = document.querySelector('.sub');

add.onclick = () => {
  dispatch({ type: 'ADD' });
}

sub.onclick = () => {
  dispatch({ type: 'SUB' });
}

addTen.onclick = () => {
  dispatch({ type: 'ADD_SOME', payload: 10 });
}
