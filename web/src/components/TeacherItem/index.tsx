import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'


function TeacherItem() {
  return (
    <article className="teacher-item">
          <header>
            <img src="https://avatars1.githubusercontent.com/u/61014068?s=460&u=05a0b5d3ed19167b1a452221ddead0241a98705c&v=4" alt="Diogo Farkas"/>
            <div>
              <strong>Diogo Farkas</strong>
              <span>Matemática</span>
            </div>
          </header>
          <p>
            Entusiasta das melhores tecnologias de matematica avançada
            <br/><br/>
            Apaixonado por calcular coisas com papel e caneta e mudar a vida das pessoas explicando o Pi
          </p>

          <footer>
            <p>
              Preço/hora
              <strong>R$ 80,00</strong>
            </p>
            <button type="button">
              <img src={whatsappIcon} alt="WhatsApp"/>
              Entrar em contato
            </button>
          </footer>
        </article>
  );
};

export default TeacherItem;