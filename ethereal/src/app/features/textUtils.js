export const saveText = (texto) => {
    if (texto) {
      localStorage.setItem('textoTemporario', texto);
      console.log('Texto salvo no localStorage');
    } else {
      console.log('Texto vazio não pode ser salvo');
    }
  };
  
  export const readText = () => {
    const texto = localStorage.getItem('textoTemporario');
    if (texto) {
      return texto;
    } else {
      return null;
    }
  };
  