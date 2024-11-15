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
      console.log('Texto encontrado:', texto);
      return texto;
    } else {
      console.log('Nenhum texto encontrado');
      return null;
    }
  };
  