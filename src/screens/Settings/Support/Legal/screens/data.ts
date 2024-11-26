const dataTerms = [
    {
        id: 'Aceptación de los términos',
        label: 'Aceptación de los términos',
        description: 'Al acceder y utilizar la plataforma de Doval Group, LLC, confirmas que aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguna parte de los términos, no debes utilizar nuestra plataforma.',
    },
    {
        id: 'Cambios en los términos',
        label: 'Cambios en los términos',
        description: 'Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier cambio será efectivo inmediatamente después de su publicación en nuestra plataforma. Tu uso continuado de la plataforma después de tales cambios implica tu aceptación de los nuevos términos.',
    },
    {
        id: 'Política de privacidad',
        label: 'Política de privacidad',
        description: 'Tu privacidad es importante para nosotros. Nuestra Política de Privacidad está disponible en nuestra plataforma y explica cómo recopilamos, usamos y compartimos tu información personal.',
    },
    {
        id: 'Responsabilidad',
        label: 'Responsabilidad',
        description: 'a. Limitación de Responsabilidad: En la medida máxima permitida por la ley, Doval Group no será responsable ante ti o cualquier tercero por daños directos, indirectos, incidentales, especiales, emergentes o punitivos resultantes del uso o la imposibilidad de usar nuestros Servicios. b. Indemnización: Te comprometes a indemnizar y eximir de responsabilidad a Doval Group, sus afiliados, directores, empleados y agentes de cualquier reclamo, demanda, pérdida, responsabilidad, daño o gasto (incluidos los honorarios legales) que surjan de tu uso de nuestros Servicios o tu violación de estos Términos.',
    },
    {
        id: 'Registro y seguridad de la cuenta',
        label: 'Registro y seguridad de la cuenta',
        description: 'Para acceder a ciertas funciones de la plataforma, es posible que debas crear una cuenta. Eres responsable de mantener la confidencialidad de tu contraseña y cuenta, y eres totalmente responsable de todas las actividades que ocurran bajo tu cuenta. Debes notificarnos de inmediato cualquier uso no autorizado de tu cuenta.',
    }, {
        id: 'Uso permitido',
        label: 'Uso permitido',
        description: 'Te otorgamos un derecho limitado, no exclusivo, revocable y no transferible para utilizar la plataforma de Doval Group, LLC conforme a estos términos. Estás autorizado a: Compartir videos y recetas con otros usuarios de la plataforma. Reaccionar a contenidos publicados por otros usuarios, dar like y comentar sobre estos contenidos. Enviar mensajes privados a otros usuarios dentro de la plataforma. Ordenar comida a través de los servicios que ofrecemos. Este uso está permitido tanto para fines personales como comerciales, bajo las condiciones de que no infrinjas los derechos de propiedad intelectual de terceros ni violes ninguna ley aplicable. Prohibimos el uso de la plataforma para cualquier otro propósito sin nuestro consentimiento previo por escrito. Esto incluye, pero no se limita a, la redistribución o reventa de cualquier parte o funcionalidad de la plataforma, así como el uso de la plataforma para cualquier forma de explotación comercial no autorizada explícitamente por nosotros.',
    }, {
        id: 'Propiedad intelectual',
        label: 'Propiedad intelectual',
        description: 'El contenido generado por los usuarios de la plataforma, incluyendo pero no limitado a videos, recetas, textos, gráficos e imágenes, es propiedad de los usuarios que los crean. Doval Group, LLC no reclama la propiedad de dichos contenidos. Sin embargo, al publicar contenido en la plataforma, los usuarios otorgan a Doval Group, LLC una licencia mundial, no exclusiva, libre de regalías y sublicenciable para usar, reproducir, distribuir, preparar trabajos derivados, mostrar y ejecutar dicho contenido. Todo contenido generado por Doval Group, LLC, como textos, gráficos, logos, imágenes, así como la compilación de estos, es propiedad exclusiva de Doval Group, LLC y está protegido por las leyes de derechos de autor internacionales y de Estados Unidos. Además, reconocemos que los usuarios tienen el derecho de descargar y utilizar los videos y recetas de otros usuarios para su uso personal y no comercial, conforme a las normativas aplicables de derechos de autor y las condiciones establecidas por la plataforma.',
    }, {
        id: 'Contenido del usuario',
        label: 'Contenido del usuario',
        description: 'Puedes publicar contenido, como comentarios y otras contribuciones, siempre que el contenido no sea ilegal, obsceno, amenazante, difamatorio, invasivo de la privacidad, infractor de derechos de propiedad intelectual, o de otra manera dañino para terceros o censurable.',
    }, {
        id: 'Terminación',
        label: 'Terminación',
        description: 'Podemos terminar o suspender tu acceso a la plataforma sin previo aviso y por cualquier motivo, incluyendo el uso no autorizado o si violas estos términos.',
    }, {
        id: 'Indemnización',
        label: 'Indemnización',
        description: 'Aceptas indemnizar y eximir a Doval Group, LLC, sus afiliados, oficiales, agentes, empleados y socios de cualquier reclamo o demanda, incluyendo honorarios de abogados, realizados por cualquier tercero debido a o que surjan de tu uso de la plataforma, tu violación de estos términos, o tu violación de cualquier derecho de otro.',
    },
    {
        id: 'Limitación de responsabilidad',
        label: 'Limitación de responsabilidad',
        description: 'Doval Group, LLC no será responsable por daños directos, indirectos, incidentales, especiales o consecuentes que resulten de tu uso o imposibilidad de usar la plataforma.',
    },
    {
        id: 'Ley aplicable y jurisdicción',
        label: 'Ley aplicable y jurisdicción',
        description: 'Estos términos se regirán e interpretarán de acuerdo con las leyes del Estado de Delaware, Estados Unidos, sin dar efecto a cualquier principio de conflictos de ley. Aceptas que cualquier disputa relacionada con estos términos será resuelta exclusivamente en los tribunales de Delaware.',
    },
    {
        id: 'Contacto',
        label: 'Contacto',
        description: 'Si tienes preguntas sobre estos términos, por favor contáctanos en dovalllc@gmail.com.',
    }
];

const dataPrivacy = [
    {
        id: 'Introducción',
        label: 'Introducción',
        description: 'Doval Group, LLC, una empresa con dirección registrada en 254 Chapman Rd, Ste 208, Newark, DE 19702, Estados Unidos, está comprometida con la protección y el respeto de tu privacidad. Esta Política de Privacidad establece las bases según las cuales cualquier dato personal que recopilamos de ti, o que tú nos proporcionas, será procesado por nosotros.',
    },
    {
        id: 'Información que recopilamos',
        label: 'Información que recopilamos',
        description: 'Podemos recopilar y procesar los siguientes datos sobre ti:\nInformación de contacto: Incluye tu número de teléfono y correo electrónico (dovalllc@gmail.com).\nUbicación precisa: Para ofrecerte recomendaciones y contenido personalizado relacionado con la gastronomía.\nDatos personales: Incluyen información que proporcionas al registrarte y usar nuestra plataforma. Estos datos son altamente confidenciales y no se comparten con terceros, excepto como se describe en esta política',
    },
    {
        id: 'Uso de la información',
        label: 'Uso de la información',
        description: 'Utilizamos la información que tenemos sobre ti de las siguientes maneras: Para proporcionarte la información, productos y servicios que solicitas de nuestra parte. Para cumplir con nuestras obligaciones derivadas de cualquier contrato entre tú y nosotros. Para permitirte participar en funciones interactivas de nuestro servicio, cuando elijas hacerlo. Para asegurarnos de que el contenido de nuestro sitio se presenta de la manera más efectiva para ti y para tu computadora o dispositivo móvil.',
    },
    {
        id: 'Almacenamiento de tus datos personales',
        label: 'Almacenamiento de tus datos personales',
        description: 'Tomamos todas las medidas necesarias para garantizar que tus datos se traten de manera segura y de acuerdo con esta política de privacidad. Los datos que recopilamos de ti pueden ser transferidos a, y almacenados en, un destino fuera de tu estado, provincia, país u otra jurisdicción gubernamental donde las leyes de protección de datos pueden diferir de las de tu jurisdicción.',
    },
    {
        id: 'Divulgación de tu información',
        label: 'Divulgación de tu información',
        description: 'No vendemos, comerciamos ni alquilamos tus datos personales a terceros. Podemos compartir tu información con terceros seleccionados, incluidos:\nSocios comerciales, proveedores y subcontratistas para la ejecución de cualquier contrato que realicemos contigo.\nAnalistas y motores de búsqueda que nos asisten en la mejora y optimización de nuestro sitio.',
    },
    {
        id: 'Tus derechos',
        label: 'Tus derechos',
        description: 'Tienes derecho a pedirnos que no procesemos tus datos personales para fines de marketing. Generalmente te informaremos (antes de recopilar tus datos) si pretendemos usar tus datos para tales fines o si pretendemos divulgar tu información a algún tercero para tales fines. Puedes ejercer tu derecho a prevenir tal procesamiento marcando ciertas casillas en los formularios que usamos para recopilar tus datos.',
    },
    {
        id: 'Acceso a la información',
        label: 'Acceso a la información',
        description: 'La ley te da derecho a acceder a la información que se tiene sobre ti. Tu derecho de acceso puede ejercerse de acuerdo con la ley.',
    },
    {
        id: 'Cambios a nuestra política de privacidad',
        label: 'Cambios a nuestra política de privacidad',
        description: 'Cualquier cambio que podamos hacer en nuestra política de privacidad en el futuro se publicará en esta página y, cuando sea apropiado, te notificaremos por e-mail. Por favor, revisa frecuentemente para ver actualizaciones o cambios en nuestra política de privacidad.',
    },
    {
        id: 'Contacto',
        label: 'Contacto',
        description: 'Preguntas, comentarios y solicitudes respecto a esta política de privacidad son bienvenidos y deben ser dirigidos a dovalllc@gmail.com',
    },
];

const dataCopyright = [ 
    {
        id: 'Generalidades',
        label: 'Generalidades',
        description: 'Doval Group, LLC respeta los derechos de propiedad intelectual de otros y espera que los usuarios de nuestra plataforma hagan lo mismo. Estamos comprometidos a proteger los derechos de autor de los creadores de contenido dentro de nuestra plataforma y facilitamos una comunidad en la que los contenidos generados por los usuarios se respeten mutuamente.',
    },
    {
        id: 'Derechos de autor y propiedad del contenido',
        label: 'Derechos de autor y propiedad del contenido',
        description: 'Contenido generado por usuarios: Cada usuario de Doval Group, LLC retiene todos los derechos de autor sobre su contenido original que publica en la plataforma, incluyendo videos, imágenes y recetas. Al publicar contenido, el usuario otorga a Doval Group, LLC una licencia no exclusiva, mundial, libre de derechos, perpetua y sublicenciable para usar, reproducir, adaptar, publicar, traducir y distribuir dicho contenido en cualquier medio.\nContenido de Doval Group, LLC: El contenido producido y distribuido por Doval Group, LLC en la plataforma es propiedad de Doval Group, LLC y está protegido por las leyes de derechos de autor y otras leyes de propiedad intelectual.',
    },
    {
        id: 'Uso autorizado del contenido',
        label: 'Uso autorizado del contenido',
        description: 'Los usuarios están autorizados a descargar, compartir y utilizar el contenido generado por otros usuarios según lo permitido explícitamente por la plataforma y dentro de los límites de uso personal y no comercial. Cualquier otro uso del contenido de la plataforma, incluyendo la reproducción, modificación, distribución, transmisión, re-publicación o exhibición sin el permiso previo por escrito del propietario de los derechos de autor, está estrictamente prohibido.',
    },{
        id: 'Notificación de infracción de derechos de autor',
        label: 'Notificación de infracción de derechos de autor',
        description: 'Si crees que tu trabajo ha sido copiado de una manera que constituye una infracción de derechos de autor en nuestra plataforma, por favor proporciona a nuestro Agente de Derechos de Autor la siguiente información:\nUna descripción del trabajo con derechos de autor que afirmas ha sido infringido;\nUna descripción de dónde se encuentra el material que afirmas está infringiendo en nuestra plataforma;\nTu dirección, número de teléfono y dirección de correo electrónico;\nUna declaración tuya indicando que crees de buena fe que el uso disputado no está autorizado por el propietario de los derechos de autor, su agente o la ley;\nUna declaración hecha bajo pena de perjurio de que la información anterior en tu notificación es precisa y que eres el propietario de los derechos de autor o estás autorizado para actuar en nombre del propietario de los derechos de autor.',
    },{
        id: 'Contacto',
        label: 'Contacto',
        description: 'Preguntas, comentarios y solicitudes respecto a esta política de privacidad son bienvenidos y deben ser dirigidos a dovalllc@gmail.com',
    }
];

export { dataTerms, dataPrivacy, dataCopyright };
