/* =========================================================
   SCRIPT.JS — INSPIRA FAM EXPERIENCE

   ÍNDICE:
   01. Reveal ao rolar
   02. Voltar ao topo
   03. Experiências
   04. Modal das experiências
   05. Inscrições
   06. Envio dos formulários
   07. Mapa interativo
   08. Deslizar no mapa
   09. Legenda do mapa
   10. Fechar modal do mapa
   11. Fechar modais clicando fora
========================================================= */


/* =========================================================
   01. REVEAL AO ROLAR
========================================================= */

const reveals =
  document.querySelectorAll('.reveal');


const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('visible');

        revealObserver.unobserve(
          entry.target
        );

      });

    },
    {
      threshold: .12
    }
  );


reveals.forEach(
  (element, index) => {

    element.style.transitionDelay =
      `${Math.min(index % 5, 4) * 70}ms`;

    revealObserver.observe(element);

  }
);



/* =========================================================
   02. VOLTAR AO TOPO
========================================================= */

document
  .querySelectorAll(
    'a[href="#top"], .back-to-top'
  )
  .forEach((link) => {

    link.addEventListener(
      'click',
      (event) => {

        event.preventDefault();

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });

      }
    );

  });



/* =========================================================
   03. EXPERIÊNCIAS
========================================================= */

const stageMascot =
  document.querySelector(
    '.stage-mascot'
  );


const experienceItems =
  document.querySelectorAll(
    '.experience-item'
  );


experienceItems.forEach((item) => {


  /* DESKTOP — ENTRAR COM O MOUSE */

  item.addEventListener(
    'mouseenter',
    () => {

      if (!stageMascot) {
        return;
      }


      let rotation = 5;


      if (
        item.dataset.tone ===
        'purple'
      ) {

        rotation = -12;

      }


      if (
        item.dataset.tone ===
        'yellow'
      ) {

        rotation = 8;

      }


      if (
        item.dataset.tone ===
        'pink'
      ) {

        rotation = -6;

      }


      stageMascot.style.transform =
        `scale(1.18) rotate(${rotation}deg)`;

    }
  );


  /* DESKTOP — SAIR COM O MOUSE */

  item.addEventListener(
    'mouseleave',
    () => {

      if (stageMascot) {

        stageMascot.style.transform =
          '';

      }

    }
  );


  /* MOBILE — TOCAR */

  item.addEventListener(
    'touchstart',
    () => {

      item.classList.add(
        'touch-active'
      );

    },
    {
      passive: true
    }
  );


  item.addEventListener(
    'touchend',
    () => {

      setTimeout(
        () => {

          item.classList.remove(
            'touch-active'
          );

        },
        180
      );

    },
    {
      passive: true
    }
  );


});



/* =========================================================
   04. MODAL DAS EXPERIÊNCIAS
========================================================= */

const experienceModal =
  document.getElementById(
    'experience-modal'
  );


const experienceNumber =
  document.getElementById(
    'experience-modal-number'
  );


const experienceTitle =
  document.getElementById(
    'experience-modal-title'
  );


const experienceText =
  document.getElementById(
    'experience-modal-text'
  );


const experienceClose =
  document.querySelector(
    '.experience-modal-close'
  );


const experienceContinue =
  document.getElementById(
    'experience-modal-button'
  );



/* CONTEÚDO DE CADA EXPERIÊNCIA */

const experienceContent = {


  expositores: {

    number: '01',

    title: 'Expositores',

    text:
      'Descubra marcas, projetos e iniciativas que transformam ideias em experiências. Um espaço para conhecer trabalhos, produtos e propostas de perto.'

  },


  gastronomia: {

    number: '02',

    title: 'Gastronomia',

    text:
      'Sabores também fazem parte da experiência. Explore diferentes opções gastronômicas e aproveite os momentos de encontro durante o evento.'

  },


  atividades: {

    number: '03',

    title: 'Atividades',

    text:
      'Experiências interativas, dinâmicas e ações pensadas para colocar você dentro do evento. Participe, experimente e descubra.'

  },


  networking: {

    number: '04',

    title: 'Networking',

    text:
      'Um espaço para criar conexões, trocar ideias e aproximar pessoas, marcas e oportunidades.'

  }


};



/* ABRIR MODAL */

document
  .querySelectorAll(
    '[data-experience]'
  )
  .forEach((item) => {


    item.addEventListener(
      'click',
      () => {


        const content =
          experienceContent[
            item.dataset.experience
          ];


        if (
          !content ||
          !experienceModal
        ) {

          return;

        }


        experienceNumber.textContent =
          content.number;


        experienceTitle.textContent =
          content.title;


        experienceText.textContent =
          content.text;


        experienceModal.dataset.tone =
          item.dataset.tone;


        experienceModal.showModal();


      }
    );


  });



/* FECHAR MODAL */

experienceClose
  ?.addEventListener(
    'click',
    () => {

      experienceModal.close();

    }
  );



experienceContinue
  ?.addEventListener(
    'click',
    () => {

      experienceModal.close();

    }
  );



/* =========================================================
   05. INSCRIÇÕES
========================================================= */

const formSection =
  document.getElementById(
    'forms'
  );


const visitorForm =
  document.getElementById(
    'visitor-form'
  );


const commercialForm =
  document.getElementById(
    'commercial-form'
  );


const formHeading =
  document.getElementById(
    'form-heading'
  );


const formTitle =
  document.getElementById(
    'form-title'
  );


const formDescription =
  document.getElementById(
    'form-description'
  );


const success =
  document.getElementById(
    'form-success'
  );


const successMascot =
  document.getElementById(
    'success-mascot'
  );


const successKicker =
  document.getElementById(
    'success-kicker'
  );


const successTitle =
  document.getElementById(
    'success-title'
  );


const successDescription =
  document.getElementById(
    'success-description'
  );


const choiceButtons =
  document.querySelectorAll(
    '[data-form]'
  );



/* =========================================================
   ABRIR O FORMULÁRIO CORRETO
========================================================= */

function openForm(type) {


  if (!formSection) {
    return;
  }


  const commercial =
    type === 'commercial';


  /* MOSTRA A SEÇÃO */

  formSection.classList.remove(
    'is-hidden'
  );


  formSection.setAttribute(
    'aria-hidden',
    'false'
  );


  /* ESCONDE A CONFIRMAÇÃO */

  success.hidden = true;


  formHeading.style.display =
    '';


  /* DEFINE QUAL FORMULÁRIO APARECE */

  visitorForm.classList.toggle(
    'active',
    !commercial
  );


  commercialForm.classList.toggle(
    'active',
    commercial
  );


  /* FORMULÁRIO COMERCIAL */

  if (commercial) {


    formTitle.innerHTML =
      `
        INTERESSE<br>
        <i>COMERCIAL.</i>
      `;


    formDescription.textContent =
      'Conte um pouco sobre sua marca e como gostaria de participar.';


  }


  /* FORMULÁRIO VISITANTE */

  else {


    formTitle.innerHTML =
      `
        INSCRIÇÃO<br>
        <i>VISITANTE.</i>
      `;


    formDescription.textContent =
      'Preencha seus dados para participar do evento.';


  }


  /* ROLA A PÁGINA ATÉ O FORMULÁRIO */

  setTimeout(
    () => {

      formSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    },
    70
  );


}



/* =========================================================
   BOTÕES DE ESCOLHA
========================================================= */

choiceButtons.forEach(
  (button) => {


    button.addEventListener(
      'click',
      () => {

        openForm(
          button.dataset.form
        );

      }
    );


    /* EFEITO MOBILE */

    button.addEventListener(
      'touchstart',
      () => {

        button.classList.add(
          'touch-hover'
        );

      },
      {
        passive: true
      }
    );


    button.addEventListener(
      'touchend',
      () => {

        setTimeout(
          () => {

            button.classList.remove(
              'touch-hover'
            );

          },
          200
        );

      },
      {
        passive: true
      }
    );


  }
);



/* =========================================================
   06. ENVIO DOS FORMULÁRIOS
========================================================= */

[
  visitorForm,
  commercialForm
]
.forEach((form) => {


  if (!form) {
    return;
  }


  form.addEventListener(
    'submit',
    (event) => {


      /* IMPEDE RECARREGAMENTO DA PÁGINA */

      event.preventDefault();


      /* VALIDA OS CAMPOS */

      if (!form.checkValidity()) {

        form.reportValidity();

        return;

      }


      const commercial =
        form.id ===
        'commercial-form';


      /* ESCONDE OS DOIS FORMULÁRIOS */

      visitorForm.classList.remove(
        'active'
      );


      commercialForm.classList.remove(
        'active'
      );


      formHeading.style.display =
        'none';


      /* MOSTRA CONFIRMAÇÃO */

      success.hidden =
        false;



      /* ===============================================
         CONFIRMAÇÃO COMERCIAL
      =============================================== */

      if (commercial) {


        successMascot.src =
          'assets/brand/mascote-explosao.png';


        successKicker.textContent =
          'interesse recebido!';


        successTitle.innerHTML =
          `
            Vamos conversar<br>
            sobre sua marca.
          `;


        successDescription.textContent =
          'Recebemos seu interesse comercial. Nossa equipe analisará as informações e você receberá um e-mail com os próximos passos e as possibilidades de participação.';


      }


      /* ===============================================
         CONFIRMAÇÃO VISITANTE
      =============================================== */

      else {


        successMascot.src =
          'assets/brand/mascote-estrela.png';


        successKicker.textContent =
          'inscrição confirmada!';


        successTitle.innerHTML =
          `
            Você está<br>
            no Inspira FAM.
          `;


        successDescription.textContent =
          'Sua inscrição como visitante foi registrada. Agora é só se preparar para viver a experiência.';


      }


      /* ROLA ATÉ A CONFIRMAÇÃO */

      setTimeout(
        () => {

          success.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });

        },
        100
      );


    }
  );


});



/* =========================================================
   07. MAPA INTERATIVO
========================================================= */

const mapZones =
  document.querySelectorAll(
    '.map-zone'
  );


const mapModal =
  document.getElementById(
    'map-modal'
  );


const mapModalNumber =
  document.getElementById(
    'map-modal-number'
  );


const mapModalTitle =
  document.getElementById(
    'map-modal-title'
  );


const mapModalText =
  document.getElementById(
    'map-modal-text'
  );


const mapModalClose =
  document.querySelector(
    '.map-modal-close'
  );


const mapModalAction =
  document.getElementById(
    'map-modal-action'
  );



/* =========================================================
   LIMPAR DESTAQUES
========================================================= */

function clearMapZones() {

  mapZones.forEach(
    (zone) => {

      zone.classList.remove(
        'map-zone-active'
      );

    }
  );

}



/* =========================================================
   ATIVAR UMA ÁREA
========================================================= */

function activateMapZone(zone) {


  clearMapZones();


  if (zone) {

    zone.classList.add(
      'map-zone-active'
    );

  }


}



/* =========================================================
   ABRIR MODAL DO MAPA
========================================================= */

function openMapModal(zone) {


  if (
    !zone ||
    !mapModal
  ) {

    return;

  }


  activateMapZone(zone);


  mapModalNumber.textContent =
    zone.dataset.mapNumber;


  mapModalTitle.textContent =
    zone.dataset.mapTitle;


  mapModalText.textContent =
    zone.dataset.mapText;


  mapModal.dataset.tone =
    zone.dataset.mapTone;


  mapModal.showModal();


}



/* =========================================================
   EVENTOS DAS ÁREAS DO MAPA
========================================================= */

mapZones.forEach(
  (zone, index) => {


    /* DELAY DA ANIMAÇÃO DE ENTRADA */

    zone.style.setProperty(
      '--zone-delay',
      `${index * 100}ms`
    );


    zone.classList.add(
      'map-zone-ready'
    );


    /* MOUSE */

    zone.addEventListener(
      'mouseenter',
      () => {

        activateMapZone(zone);

      }
    );


    zone.addEventListener(
      'mouseleave',
      () => {

        zone.classList.remove(
          'map-zone-active'
        );

      }
    );


    /* TOUCH */

    zone.addEventListener(
      'touchstart',
      () => {

        activateMapZone(zone);

      },
      {
        passive: true
      }
    );


    /* ABRE O MODAL */

    zone.addEventListener(
      'click',
      () => {

        openMapModal(zone);

      }
    );


  }
);



/* =========================================================
   08. DESLIZAR O DEDO SOBRE O MAPA
========================================================= */

document.addEventListener(
  'touchmove',
  (event) => {


    if (!mapZones.length) {
      return;
    }


    const touch =
      event.touches[0];


    if (!touch) {
      return;
    }


    const target =
      document
        .elementFromPoint(
          touch.clientX,
          touch.clientY
        )
        ?.closest(
          '.map-zone'
        );


    if (target) {

      activateMapZone(target);

    }


  },
  {
    passive: true
  }
);



document.addEventListener(
  'touchend',
  () => {


    if (!mapZones.length) {
      return;
    }


    setTimeout(
      clearMapZones,
      200
    );


  },
  {
    passive: true
  }
);



/* =========================================================
   09. LEGENDA DO MAPA
========================================================= */

document
  .querySelectorAll(
    '[data-map-jump]'
  )
  .forEach((button) => {


    button.addEventListener(
      'click',
      () => {


        const zone =
          document.querySelector(
            `[data-map-zone="${button.dataset.mapJump}"]`
          );


        if (!zone) {
          return;
        }


        activateMapZone(zone);


        zone.classList.add(
          'map-zone-pulse'
        );


        zone.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });


        setTimeout(
          () => {

            zone.classList.remove(
              'map-zone-pulse'
            );

          },
          1200
        );


      }
    );


  });



/* =========================================================
   10. FECHAR MODAL DO MAPA
========================================================= */

mapModalClose
  ?.addEventListener(
    'click',
    () => {

      mapModal.close();

    }
  );


mapModalAction
  ?.addEventListener(
    'click',
    () => {

      mapModal.close();

    }
  );



/* =========================================================
   11. FECHAR MODAIS CLICANDO FORA
========================================================= */

[
  experienceModal,
  mapModal
]
.forEach((modal) => {


  if (!modal) {
    return;
  }


  modal.addEventListener(
    'click',
    (event) => {


      const rect =
        modal.getBoundingClientRect();


      const outside =

        event.clientX <
        rect.left ||

        event.clientX >
        rect.right ||

        event.clientY <
        rect.top ||

        event.clientY >
        rect.bottom;


      if (outside) {

        modal.close();

      }


    }
  );


});