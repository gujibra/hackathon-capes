import { useState, useEffect, React } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Header() {
    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
      
      let a = window.location.pathname;
      setCurrentUrl(" /    " + a.slice(1));
    }, []);

    return (
        <header className="bg-white-100 shadow-sm ">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-5xl">
                <div className="flex items-center">
                    <a
                        href="https://www.gov.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                    >
                        <img
                            src="https://www.gov.br/governodigital/pt-br/estrategias-e-governanca-digital/rede-nacional-de-governo-digital/10passos/biblioteca/logo-govbr.png/@@images/image"
                            alt="Logo do Governo Federal"
                            className="h-12 w-auto md:h-8"
                        />
                    </a>
                    <div className="hidden lg:block ml-4">
                        <a
                            href="https://www.gov.br/capes"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-low text-gray-500"
                        >
                            Ministério da Educação/CAPES
                        </a>
                    </div>
                </div>
                <nav className="flex items-center space-x-4">
                    <ul className="hidden lg:flex space-x-4 text-sm text-blue-800">
                        <li>
                            <a
                                href="https://www.gov.br/pt-br/orgaos-do-governo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gray-900 transition-colors duration-300"
                            >
                                Órgãos do Governo
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.gov.br/acessoainformacao/pt-br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gray-900 transition-colors duration-300"
                            >
                                Acesso à Informação
                            </a>
                        </li>
                        <li>
                            <a
                                href="http://www4.planalto.gov.br/legislacao"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gray-900 transition-colors duration-300"
                            >
                                Legislação
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.gov.br/governodigital/pt-br/acessibilidade-digital"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gray-900 transition-colors duration-300"
                            >
                                Acessibilidade
                            </a>
                        </li>
                    </ul>
                    <li>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <i className="fas fa-adjust" style={{ color: '#1351b4' }}></i>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://acesso.gov.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-gray-200 text-white px-4 py-2 rounded-[20px] hover:bg-gray-300 flex items-center space-x-2 transition-colors duration-300"
                        >
                            <i className="fas fa-user" style={{ color: '#1351b4' }}></i>
                            <span style={{ color: '#1351b4' }}>Entrar</span>
                        </a>
                    </li>
                </nav>
            </div>

            <nav className=" py-2" style={{ backgroundColor: '#1c1c5e' }}>
                <div className="container mx-auto px-4 max-w-5xl">
                    <ul className="flex items-center text-sm text-white space-x-2">
                        <li>
                            <a href="/" className="flex items-center hover:underline">
                                <i className="fas fa-home mr-2"></i>
                                <span>Home</span>
                            </a>
                        </li>
                        
                        <li> 
                            <a href="" className="hover:underline">{currentUrl}</a>
                        </li>
                        
                    </ul>
                </div>
            </nav>
        </header>
    );
}


