import DateFormat from 'dateformat'

export const DAILY_IMAGES = [
    {
        "image": "https://res.cloudinary.com/dffxfch4f/image/upload/v1562030462/bible/2019-07-01.jpg",
    },
    {
        "image": "https://res.cloudinary.com/dffxfch4f/image/upload/v1563406415/bible/2019-07-17.jpg"
    },
    {
        "image": "https://res.cloudinary.com/dffxfch4f/image/upload/v1561810387/bible/2019-06-29.jpg"
    },
    {
        "image": "https://res.cloudinary.com/dffxfch4f/image/upload/v1562254432/bible/2019-07-04.jpg"
    },
    {
        "image": "https://res.cloudinary.com/dffxfch4f/image/upload/v1562766261/bible/2019-07-10.jpg"
    },
    {
        "image": "https://res.cloudinary.com/dffxfch4f/image/upload/v1562594138/bible/2019-07-08.jpg"
    },
    {
        "imageAspectRatio": "1x1",
        "image": "https://res.cloudinary.com/dffxfch4f/image/upload/v1562513748/bible/2019-07-07.jpg"
    },
    {
        "imageAspectRatio": "1x1",
        "image": "https://res.cloudinary.com/dffxfch4f/image/upload/v1561336048/bible/2019-03-29.jpg"
    },
    {
        "imageAspectRatio": "4x3",
        "image": "https://res.cloudinary.com/dffxfch4f/image/upload/v1561334956/bible/2019-04-02.jpg"
    },
    {
        "image": "https://res.cloudinary.com/dffxfch4f/image/upload/v1561543958/bible/2019-06-26.jpg"
    },
    {
        "image": "https://res.cloudinary.com/dffxfch4f/image/upload/v1561632910/bible/2019-06-27.jpg"
    },
    {
        "imageAspectRatio": "1x1",
        "image": "https://res.cloudinary.com/dffxfch4f/image/upload/v1561810387/bible/2019-06-29.jpg"
    },
    {
        "imageAspectRatio": "4x3",
        "image": "https://res.cloudinary.com/dffxfch4f/image/upload/v1562030462/bible/2019-07-01.jpg"
    },
    {
        "imageAspectRatio": "4x3",
        "image": "https://res.cloudinary.com/dffxfch4f/image/upload/v1562349478/bible/2019-07-05.jpg"
    },
    {
        "imageAspectRatio": "1x1",
        "image": "https://res.cloudinary.com/dffxfch4f/image/upload/v1562254432/bible/2019-07-04.jpg"
    },
    {
        "image": "https://res.cloudinary.com/dffxfch4f/image/upload/v1562162115/bible/2019-07-03.jpg"
    }
].filter((_img, _i, _array) => {
    for (let i = 0; i < _i; i++) {
        if (_array[i].image === _img.image) {
            return false;
        }
    }

    return true;
})

export const DAILY = [
    {
        "data": "**Pai celestial**,\\n\\nOlha para mim e lembra-te de que tu que me criaste e me separaste para ser teu. \\n\\nResponde às orações mais profundas, por vezes silenciosas e incompreensíveis, que brotam do meu coração. \\n\\nDesejo ser ouvido por ti como uma criança que tem a atenção do pai. Mostra-te a mim para que eu te conheça de verdade e possa te agradecer por ter nascido e por ter sido escolhido. \\n\\nNão desprezes as minhas mais simples necessidades, pois são elas que me fazem sentir humildemente dependente de ti e me dão a certeza de que tu és maior do que tudo o que parece impossível para mim. \\n\\nDá-me uma vida simples onde a força do teu amor possa matar minha sede, fortalecendo-me para prosseguir, e enche-me com a tua sabedoria para administrar as grandes bênçãos que tu tens a derramar sobre mim. \\n\\nLivra-me de todo o mal e das lembranças ruins do passado, ensina-me dia a dia para que eu possa trilhar o caminho do bem e dá-me sempre a segurança de me sentir amado e aprovado por ti. \\n\\nPreserva-me na inocência e na pureza da infância. Concede-me a felicidade de viver numa família unida e o privilégio de ter um trabalho reconhecido e honrado, pois a ti eu tudo consagro, a fim de que a glória das minhas conquistas pertença somente a ti. \\n\\nEu também te agradeço pelas bênçãos que tu me dás todos os dias, e sei que receberei o que peço. \\n\\nAmém.",
        "schedule": "2019-07-18",
        "notification": "Pai celestial"
    }, {
        "data": "**Salmo 61**\\n\\n**1**. Ouve o meu clamor, ó Deus; atenta para a minha oração.\\n\\n**2**. Desde os confins da terra eu clamo a ti com o coração abatido; põe-me a salvo na rocha mais alta do que eu.\\n\\n**3**. Pois tu tens sido o meu refúgio, uma torre forte contra o inimigo.\\n\\n**4**. Para sempre anseio habitar na tua tenda e refugiar-me no abrigo das tuas asas.\\n\\n**5**. Pois ouviste os meus votos, ó Deus; deste-me a herança que concedes aos que temem o teu nome.\\n\\n**6**. Prolonga os dias do rei, por muitas gerações os seus anos de vida.\\n\\n**7**. Para sempre esteja ele em seu trono, diante de Deus; envia o teu amor e a tua fidelidade para protegê-lo.\\n\\n**8**. Então sempre cantarei louvores ao teu nome, cumprindo os meus votos cada dia.",
        "schedule": "2019-07-17",
        "notification": "Salmo 61",
    }, {
        "data": "***Salmo 54***\\n\\n**1**. Salva-me, ó Deus, pelo teu nome; defende-me pelo teu poder.\\n\\n**2**. Ouve a minha oração, ó Deus; escuta as minhas palavras.\\n\\n**3**. Estrangeiros me atacam; homens cruéis querem matar-me, homens que não se importam com Deus.\\n\\n**4**. Certamente Deus é o meu auxílio; é o Senhor que me sustém.\\n\\n**5**. Recaia o mal sobre os meus inimigos! Extermina-os por tua fidelidade!\\n\\n**6**. Eu te oferecerei um sacrifício voluntário; louvarei o teu nome, ó Senhor, porque tu és bom.\\n\\n**7**. Pois ele me livrou de todas as minhas angústias, e os meus olhos contemplaram a derrota dos meus inimigos.",
        "schedule": "2019-07-16",
        "notification": "Salmo 54"
    }, {
        "data": "Senhor, neste dia quero aprender a louvar Teu Nome.\\n\\nEu sei que tropeço, muitas vezes, por não encontrar as palavras apropriadas no momento em que faço oração.\\n\\nDaí, Senhor, eu me sinto encabulado, sem saber o que fazer ou dizer.\\n\\n\\n \\nTambém sei Senhor que, durante as atividades do dia, muitas palavras vêm a minha boca e eu as profiro sem pensar nas consequências que trarão às pessoas que estão ao meu lado.\\n\\nCom isso eu ofendo algumas pessoas, sem que tivesse intensão de fazer isso.\\n\\nPeço-Te, Senhor, neste momento, que me dê sabedoria, assim como o Senhor a deu ao Rei Salomão.\\n\\nA Bíblia diz que o Senhor deu sabedoria ao Rei Salomão em sonhos.\\n\\nDê-me, Senhor, sabedoria para separar neste dia o que é certo do que é errado e viver segundo os Seus mandamentos.\\n\\nSenhor, eu vejo no olhar atravessado de meu irmão que ele não gosta de mim, que ele me odeia e gostaria que eu fosse para bem longe da vida dele.\\n\\nAjude-me, Senhor, a olhar para meu irmão com olhos de ternura, de gratidão e de amor.\\n\\nLonge de mim o ódio, Senhor, pois o ódio não deve acompanhar quem deseja ser chamado de filho de Deus.\\n\\nEu quero estar sempre perto de Ti, Senhor, e fazer tudo aquilo que o Senhor quer que eu faça.\\n\\n\\n \\nQuero fazer o bem ao meu semelhante, assim como quero que ele faça comigo o mesmo.\\n\\nEu Te agradeço, Senhor Jesus, por todas as bênçãos que o Senhor me dá todos os dias de minha vida.\\n\\nAmém.",
        "schedule": "2019-07-15",
        "notification": "Oração do dia!",
    }, {
        "data": "# Obrigado meu **Deus**!\\n\\nTe agradeço pela casa que me concedeu e o teto que me protege da chuva e outros contratempos da natureza.\\n\\nSou grato também pelo cobertor que me aquece no frio e pela comida que tem providenciado em minha mesa quando tenho fome.\\n\\nTambém te agradeço pelo trabalho que provêm meu sustento e a família que me destes, bem como a proteção divina que nunca me desampara.\\n\\nObrigado por tudo, **meu Deus**.\\n\\nAmém.",
        "schedule": "2019-07-14",
        "notification": "Obrigado meu Deus!",
    }, {
        "data": "**Senhor**\\n\\nCuida de mim hoje, acompanha meus passos e me proteje dos perigos.\\n\\nEu sinto a tua presença passando pela minha alma. \\n\\nCuida também da minha família e dos meus amigos. Cuida daqueles de quem eu não gosto, e de quem não gosta de mim.\\n\\nPeço que olhe por todos, **Senhor**, pois não quero guardar ódio por ninguém!\\n\\nE espero que se encham do mesmo amor que eu guardo por **Ti**.\\n\\nObrigado, meu **Deus**, segue comigo neste dia!\\n\\nAmém.\\n",
        "schedule": "2019-07-10",
        "notification": "Oração do amor de Deus!",
    }, {
        "data": "# Oração para encontrar a paz.\\n\\nMeu **Deus**,\\n\\nObrigado por tudo que tenho. \\n\\nMeus bens são poucos, minha casa é pequena, mas nela reside todo o amor da minha *família*.\\n\\nObrigado pelos desafios diários, pois eles me ajudam a crescer, obrigado pelos meus amigos, pois eles me ajudam a vencer cada novo dia.\\n\\nAfasta de mim a tristeza, a raiva e o medo. Enche meu peito de paz.\\n\\nDe hoje em diante, eu me sentirei melhor, protegido e em paz, porque tu estás comigo, meu **Deus**.\\n\\nE enquanto estiver comigo, estará comigo também a felicidade.\\n\\nAmém.",
        "schedule": "2019-07-08",
        "notification": "Oração para encontrar a paz!",
    }, {
        "data": "Senhor, neste dia, antes de executar qualquer atividade que me é incumbida, quero aprender a louvar Teu Nome.\\nEu sei que tropeço, muitas vezes, por não encontrar as palavras apropriadas no momento em que faço oração.\\nDaí, Senhor, eu me sinto encabulado, sem saber o que fazer ou dizer.\\nTambém sei Senhor que, durante as atividades do dia, muitas palavras vêm a minha boca e eu as profiro sem pensar nas consequências que trarão às pessoas que estão ao meu lado.\\nCom isso eu ofendo algumas pessoas, sem que tivesse intensão de fazer isso.\\nPeço-Te, Senhor, neste momento, que me dê sabedoria, assim como o Senhor a deu ao Rei Salomão.\\nA Bíblia diz que o Senhor deu sabedoria ao Rei Salomão em sonhos.\\nDê-me, Senhor, sabedoria para separar neste dia o que é certo do que é errado e viver segundo os Seus mandamentos.\\nSenhor, eu vejo no olhar atravessado de meu irmão que ele não gosta de mim, que ele me odeia e gostaria que eu fosse para bem longe da vida dele.\\nAjude-me, Senhor, a olhar para meu irmão com olhos de ternura, de gratidão e de amor.\\nLonge de mim o ódio, Senhor, pois o ódio não deve acompanhar quem deseja ser chamado de filho de Deus.\\nEu quero estar sempre perto de Ti, Senhor, e fazer tudo aquilo que o Senhor quer que eu faça.\\nQuero fazer o bem ao meu semelhante, assim como quero que ele faça comigo o mesmo.\\nEu Te agradeço, Senhor Jesus, por todas as bênçãos que o Senhor me dá todos os dias de minha vida.\\nAmém.",
        "schedule": "2019-07-07",
        "notification": "Oração do dia",
    }, {
        "data": "**1** - O Senhor é o meu pastor; nada me faltará.\\n**2** - Deitar-me faz em pastos verdejantes; guia-me mansamente a águas tranqüilas.\\n**3** - Refrigera a minha alma; guia-me nas veredas da justiça por amor do seu nome.\\n**4** - Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.\\n**5** - Preparas uma mesa perante mim na presença dos meus inimigos; unges com óleo a minha cabeça, o meu cálice transborda.\\n**6** - Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida, e habitarei na casa do Senhor por longos dias.",
        "schedule": "2019-07-05",
        "notification": "Oração para afastar a solidão",
    }, {
        "data": "Senhor **Deus**, nosso **Pai**, nós cremos em vós.\\nNós esperamos em vós. Nós vos amamos.\\nNós vos agradecemos a tarde deste dia.\\nNós vos damos graças, por que estamos com vida e nós vos oferecemos este dia com todas as nossas alegrias e sofrimentos, com todos os nossos trabalhos e divertimentos.\\nGuardai-nos do pecado e fazei de nós um instrumento de vossa paz e de vosso amor.\\nAjudai-nos a observar vossos mandamentos.\\n**Amém**.",
        "schedule": "2019-07-04",
        "notification": "Oração da Tarde",
    }, {
        "data": "# **ORAÇÃO PODEROSA PELOS FILHOS**\\nMeu **Deus**, eu vos ofereço meus filhos.\\nVós me destes, eles vos pertencerão para sempre; eu os educo para vós e vos peço que os conserveis para a vossa glória.\\n**Senhor**, que o egoísmo, a ambição e a maldade não os desviem do bom caminho.\\nQue eles tenham força para agir contra o mal e que a motivação de todos os seus atos sejam sempre e unicamente o bem.\\nHá tanta maldade nesse mundo, **Senhor**, e Vós sabeis como somos fracos e como o mal muitas vezes nos fascina; mas vós estais conosco e eu coloco meus filhos sob a vossa proteção.\\nSejais luz, força e alegria nesta terra, **Senhor**, para que eles vivam por vós na terra e no céu, e que todos juntos, possamos gozar de vossa companhia para sempre. \\nAmém!",
        "schedule": "2019-07-03",
        "notification": "ORAÇÃO PODEROSA PELOS FILHOS",
    }, {
        "data": "**1** - O **Senhor** é o meu pastor; nada me faltará.\\n**2** - Deitar-me faz em pastos verdejantes; guia-me mansamente a águas tranquilas.\\n**3** - Refrigera a minha alma; guia-me nas veredas da justiça por amor do seu nome.\\n**4** - Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.\\n**5** - Preparas uma mesa perante mim na presença dos meus inimigos; unges com óleo a minha cabeça, o meu cálice transborda.\\n**6** - Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida, e habitarei na casa do Senhor por longos dias.\\nAmém.",
        "schedule": "2019-07-01",
        "notification": "Salmo do Dia",
    }, {
        "data": "# Oração de Agradecimento\\nSenhor meu DEUS e meu Pai\\neu te Agradeço por tudo o que tens feito em minha vida: pela alegria de viver, por minha família, pelos meus amigos, pelo ar que respiro, pelos dons que me deste, pelos relacionamentos que possibilitam que eu cresça a cada dia, Por tudo.\\nObrigado, PAI, pelas oportunidades que me tens dado de testemunhar o Amor com que amas a mim e a todas as pessoas.\\nObrigado PAI, por Teu perdão e por dar-me uma vida plena e abundante.\\nSenhor, a Ti, que és o Criador de tudo o que sou e o que possuo, dedico a minha vida, clamando para que eu veja e faça sempre a TUA VONTADE, e que minhas obras Honrem e Glorifiquem o Teu nome.\\nAmém.",
        "schedule": "2019-06-29",
        "notification": "Oração de Agradecimento",
    }, {
        "data": "# Senhor,\\nneste dia, venho pedir-Te saúde, força, paz e sabedoria.\\nQuero olhar hoje o mundo com olhos cheios de amor, ser paciente, compreensivo, manso e prudente; ver, além das aparências, teus filhos como Tu mesmo os vês, e assim não ver senão o bem em cada um.\\nFecha os meus ouvidos a toda a calúnia.\\nGuarda a minha língua de toda a maldade.\\nQue só de bênçãos se encha o meu espírito.\\nQue eu seja tão bondoso e alegre, que todos quantos se aproximarem de mim, sintam a tua presença.\\nSenhor, reveste-me da tua beleza, e que, no decurso deste dia, eu Te revele a todos.\\nAMÉM.",
        "schedule": "2019-06-28",
        "notification": "Senhor!"
    }, {
        "data": "# Senhor Jesus,\\nEu quero me prostrar diante da maior prova do teu amor por mim: a Tua cruz redentora.\\nReconheço todo meu pecado que pesou sobre Teu Corpo, fazendo com que Teu Sangue jorrasse para o perdão desses mesmos pecados.\\nEu, agora, os apresento a ti, arrependo-me deles.\\nÓ Jesus, eu te peço: perdoa-me por todo mal instalado no meu coração, toda raiz de ódio, inveja, gula, julgamento, maledicência, mentira, egoísmo, orgulho, vaidade, vícios e desregramentos, preguiça, avareza, sensualidade, soberba e impaciência.\\nAmém.",
        "schedule": "2019-06-27",
        "notification": "Senhor Jesus",
    }, {
        "data": "# Oração por um Milagre\\nSenhor, está escrito na tua palavra que: \"**Os impossíveis do homem, são possíveis para Deus**\".\\nEu creio que Tu és o Deus Todo Poderoso e que, ainda hoje, Tu podes fazer muitos milagres.\\nCreio sem vacilar, que este milagre que preciso vou receber em Teu nome.\\nSenhor, libera o Teu poder sobre esta situação que estou passando, para que, com a fé que o Senhor me deu, eu receba o milagre e glorificarei o Teu nome.\\nEu Te agradeço, porque, com a minha fé, posso remover montanhas e receber das tuas mãos as bênçãos que só o Senhor pode me conceder.\\nEm nome de Jesus, Amém!",
        "schedule": "2019-06-26",
        "notification": "Oração por um Milagre",
    }, {
        "data": "# Momento de Doação\\n\\nEsta vaquinha é destinada a ajudar os anjos de rua, com alimentação, medicamentos e todo suporte na tentativa de conseguir um lar definitivo para nossos inocentes. Nos ajude nesta campanha!\\n\\nPara doar acesse: [FAZER DOAÇÂO](http://vaka.me/521686)",
        "schedule": "2019-06-25",
        "notification": "Momento de doação",
    }, {
        "data": "Ouvirás a minha voz ó Senhor\\n\\nPai Celestial, venho a Ti agradecer por este dia.\\n\\nObrigado por tudo que passou, pelo sono tranquilo e reparador.\\n\\nHoje quero louvar Teu nome e pedir que a cada minuto, lembre-me que minha vida é muito preciosa e que o dia de hoje Tu me deste para que eu me realize e seja feliz.\\n\\nPreenche-me com Teu amor e Tua sabedoria.\\n\\nAbençoa meu lar e meu trabalho.\\n\\nQue nesta vida eu tenha bons pensamentos, fale boas palavras,\\n\\nseja bem-sucedido em minhas ações e aprenda a fazer a Tua vontade.\\n\\nEntrego minha vida em tuas mãos.\\n\\nSei que estarei bem.\\n\\nObrigado, Senhor.\\n\\nAmém.",
        "schedule": "2019-06-24",
        "notification": "Oração para uma vida plena",
    }, {
        "data": "# SALMO 90 - Oração de Moisés, homem de Deus.\\n1. Senhor, tu és o nosso refúgio, sempre, de geração em geração.\\n2. Antes de nascerem os montes e de criares a terra e o mundo, de eternidade a eternidade tu és Deus.\\n3. Fazes os homens voltarem ao pó, dizendo: “Retornem ao pó, seres humanos!”\\n4. De fato, mil anos para ti são como o dia de ontem que passou, como as horas da noite.\\n5. Como uma correnteza, tu arrastas os homens; são breves como o sono, são como a relva que brota ao amanhecer;\\n6. germina e brota pela manhã, mas, à tarde, murcha e seca.\\n7. Somos consumidos pela tua ira e aterrorizados pelo teu furor.\\n8. Conheces as nossas iniquidades; não escapam os nossos pecados secretos à luz da tua presença.\\n9. Todos os nossos dias passam debaixo do teu furor; vão-se como um murmúrio.\\n10. Os anos de nossa vida chegam a setenta, ou a oitenta para os que têm mais vigor, entretanto, são anos difíceis e cheios de sofrimento, pois a vida passa depressa, e nós voamos!\\n11. Quem conhece o poder da tua ira? Pois o teu furor é tão grande como o temor que te é devido.\\n12. Ensina-nos a contar os nossos dias para que o nosso coração alcance sabedoria.\\n13. Volta-te, Senhor! Até quando será assim? Tem compaixão dos teus servos!\\n14. Satisfaze-nos pela manhã com o teu amor leal, e todos os nossos dias cantaremos felizes.\\n15. Dá-nos alegria pelo tempo que nos afligiste, pelos anos em que tanto sofremos.\\n16. Sejam manifestos os teus feitos aos teus servos, e aos filhos deles o teu esplendor!\\n17. Esteja sobre nós a bondade do nosso Deus Soberano. Consolida, para nós, a obra de nossas mãos. Consolida a obra de nossas mãos!",
        "schedule": "2019-06-23",
        "notification": "Oração de Moisés, homem de Deus"
    }, {
        "data": "# Oração para 2019.\\nMeu Senhor, iniciamos este ano com muita paz e esperança,\\nas lutas nunca param, os desafios nunca diminuem,\\nmas eu me sinto sempre mais forte, porque me fortaleço com tua presença.\\nMeu Deus, nesta nova jornada, aproxima de mim os que amo,\\ne manda muito amor aos que me odeiam, porque não lhes guardo mais rancor.\\nQuero que eles, assim como eu, descubram que na tua paz reside nossa felicidade.\\nObrigado, meu Deus, segue comigo neste dia!",
        "schedule": "2019-01-14",
        "notification": "Oração para 2019!"
    }, {
        "data": "# Oração para o final de ano.\\nMeu Deus, neste final de 2018 eu desejo toda paz e felicidade para minha família.\\nSei que errei muito este ano, mas peço que me perdoe, e me mostre o caminho da tua paz.\\nPeço que leve fartura aos que tem pouco, para que tenham um fim de ano confortável.\\nPeço que leve paz aos que tem muito, para que encontrem a tua palavra.\\nPeço também, Senhor, que me acompanhe e me guarde, para que eu poça descansar e me renovar para um novo ano em tua presença.\\nObrigado, meu Deus!",
        "schedule": "2018-12-16",
        "notification": "Oração para o final de ano"
    }, {
        "data": "# Descubra sua felicidade.\\nObrigado, meu Deus, pela comida em minha mesa, pois não é muita nem pouca, é a quantidade certa.\\nObrigado pelos desafios todos os dias, pois não são fáceis nem impossíveis, são do tamanho do meu ombro.\\nObrigado pela minha família, que não é perfeita nem santa, mas que me dá todo o amor que preciso.\\nVejo felicidade em minha vida, Senhor, não em bens materiais, dinheiro ou luxo, mas em pequenas coisas.\\nVejo felicidade nos pássaros que me acordam pela manhã.\\nVejo felicidade no conforto da minha cama, que tantos não têm.\\nVejo felicidade em ter saúde, que a tantos falta.\\nNão te peço riquesa material, Senhor, peço apenas que cuide dos meus, e que siga comigo neste dia.\\nObrigado, meu Deus.  ",
        "schedule": "2018-12-08",
        "notification": "Descubra sua felicidade"
    }, {
        "data": "# Oração para afastar os inimigos.\\nMeu Deus, eu sou aquilo que eu trago para o mundo. Sei que quanto mais eu amar, mais serei amado, e que quanto mais eu odiar, mais serei odiado. Por isso, levarei todo o amor que puder a quem quiser recebê-lo.\\nMas os que me odeiam, Senhor, afasta-os de mim, e lhes dê toda paz e alegria, pois não lhes desejo mal.\\nDesejo aos meus inimigos toda paz e todo o amor, para que percebam que o ódio é uma doença, e que o amor é a cura.\\nCuida de mim, Senhor, cuida da minha família e amigos, e cuida também dos que me odeiam, porque lhes falta o teu amor.\\nObrigado, meu Deus!",
        "schedule": "2018-12-07",
        "notification": "Oração para afastar os inimigos"
    }, {
        "data": "# Oração contra a tristeza.\\nSenhor, estou triste, o mundo parece desmoronar sobre mim.\\nPreciso de paz e força para seguir em frente.\\nSei que todos os meus problemas não são nada, sei que sou pequeno e insignificante.\\nMas eu sei, meu Deus, que nunca irás me abandonar, e que ao final desta oração me sentirei melhor.\\nSempre que falo contigo, meu Senhor, meu peito se enche de paz, e minha vida se enche de alegria.\\nQuando chamo teu nome, meu Deus, me sinto mais leve, e mais amado, e sei que ao final desta oração, minha vida irá mudar, e serei ainda mais forte.\\nQue a tua paz esteja comigo, meu Deus, obrigado!",
        "schedule": "2018-12-02",
        "notification": "Oração contra a tristeza"
    }, {
        "data": "# Oração para começar bem o mês.\\nSenhor Deus, estamos iniciando o último mês do ano,\\nmês do nascimento do teu filho, um mês santo.\\nQue abençoado seja este mês, e que abençoada seja minha família.\\nTraz para mim muita paz e alegria, mantém os inimigos longe, e os amigos mais perto.\\nToda festa e alegria deste mês é em Tua honra,\\nObrigado meu Deus.",
        "schedule": "2018-12-01",
        "notification": "# Oração para começar bem o mês."
    }, {
        "data": "# Oração do novo dia.\\nHoje eu serei uma nova pessoa. Hoje me sinto mais forte para lutar cada batalha.\\nMe envolve, Senhor, com a tua paz e com a certeza, de que o dia de hoje será melhor.\\nHoje não temerei nenhum desafio, pois tu me guias, tu me proteges, tu me guardas.\\nHoje me sinto mais feliz, e mais contente, porque Tu estás comigo.\\nSenhor, segue comigo neste dia!",
        "schedule": "2018-11-26",
        "notification": "# Oração do novo dia"
    }, {
        "data": "# Oração pelos filhos e filhas.\\nMeu amado filho, eu te abençoo, pois tu também és filho de Deus.\\nTu és capaz, tu és forte, tu és inteligente, tu és bondoso, tu conseguirás tudo, pois Deus reside dentro de ti.\\nMeu filho, eu te amo com a mesma força e ternura do amor de Deus.\\nTu nasceste abençoado por Deus, e estás crescendo abençoado por nós.\\nObrigado por entrar em minha vida.\\nQue Deus siga com você neste dia.",
        "schedule": "2018-11-21",
        "notification": "Oração pelos filhos e filhas"
    }, {
        "data": "# Viva com simplicidade.\\nMeu Deus, hoje eu me livrarei de toda pressa, de toda euforia e de toda raiva.\\nEu andarei no ritmo do teu coração, Senhor, que bate lenta e carinhosamente, como o coração de uma mãe.\\nOs problemas do dia vem e vão, mas minha paz será inabalável, pois sei que cuidas de mim.\\nHoje não pedirei riquesa, pois ela já reside em minha família, e em minha humilde casa.\\nHoje te peço apenas paz, pois nela reside toda felicidade.\\nApenas na tua paz posso ouvir o som do vento nas folhas das árvores, posso sentir as roupas tocando meu corpo, posso sentir o agradável toque da água em meu rosto.\\nNa tua paz, Senhor, posso ouvir o som da voz de minha mãe, que sempre estará em meu coração. Na tua paz, posso sentir a mão de meu pai em meus cabelos, me guiando mais uma vez pelos desafios da vida.\\nQue a Tua paz, Senhor, esteja comigo neste dia.",
        "schedule": "2018-11-20",
        "notification": "# Viva com simplicidade."
    }, {
        "data": "# Oração da prosperidade: Salmo 23\\nO Senhor é o meu pastor, nada me faltará.\\nDeitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.\\nRefrigera a minha alma; guia-me pelas veredas da justiça, por amor do Seu nome.\\nAinda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque Tu estás comigo; a Tua vara e o teu cajado me consolam.\\nPreparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda.\\nCertamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na casa do SENHOR por longos dias.",
        "schedule": "2018-11-19",
        "notification": "Oração da prosperidade: Salmo 23"
    }, {
        "data": "# Tu és aquilo que entregas ao mundo \\nSenhor, me ensina a fazer o bem, pois fazendo-o, eu o receberei.\\nMe ensina a amar o próximo, pois só assim serei amado.\\nMe ensina a dar antes de receber, pois eu sei que receberei em dobro tudo aquilo que eu der ao próximo.\\nNão tenho muitos bens materiais, meu Deus, mas tenho amor de sobra em meu coração, e o distribuirei a todos que cruzarem o meu caminho.\\nDarei aos tristes, palavras de amor, pois são a tua palavra. Darei aos que têm fome, um pedaço de pão, pois este é o teu corpo.\\nDarei aos meus inimigos, um sorrizo, pois confio em tua proteção, e sei que enquanto eu fizer o bem, não receberei o mal.\\n",
        "schedule": "2018-11-17",
        "notification": "Tu és aquilo que entregas ao mundo"
    }, {
        "data": "# Oração para cura interna\\nQuerido Jesus, Tu que curaste a tantos sobre a terra, derrama Tua bênção sobre a minha cabeça, pois minha mente está inquieta.\\nDerrama sobre mim a tua paz, pois meu corpo está cansado.\\nMe ensina a redescobrir o meu caminho, pois sou fraco, e não sei para onde ir.\\nMesmo sendo pequeno, não terei medo, pois sei que estarás comigo.\\nMesmo cançado, serei forte, pois me apoiarei em Tua força.\\nMesmo em meio a multidão, não ficarei confuso, pois tua palavra me mostrará o caminho.\\nSenhor, segue comigo neste dia.\\nAmén.",
        "schedule": "2018-11-16",
        "notification": "Oração para cura interna"
    }, {
        "data": "# Oração da paz\\nMeu Deus, creio em Ti, espero em Ti, e amo-te com todas as minhas forças, glória a Ti, Senhor!\\n Deposito nas tuas mãos a fadiga e a luta, as alegrias e desencantos deste dia.\\n Se os nervos me traíram, se os impulsos egoístas me dominaram, se dei lugar ao rancor ou à tristeza, perdão, Senhor!\\n Se fui infiel, se pronunciei palavras em vão, se me deixei levar pela impaciência, se fui um espinho para alguém, perdão Senhor!\\n Eu te agradeço, meu Pai, e peço que sejas a sombra fresca que me cobrirá durante todo este dia.\\n Eu te agradeço porque, invisível, carinhoso e envolvente, cuidaste de mim como uma mãe, em todas essas horas.\\n Ao redor de mim tudo já é silêncio e calma.\\n Envia o anjo da paz a esta casa.\\n Relaxa meus nervos, sossega o meu espírito, solta as minhas tensões, inunda meu ser de silêncio e de serenidade.\\n Vela por mim, Pai querido, enquanto eu me entrego confiante a este dia, como uma criança que sai feliz para brincar.\\n Em teu nome, Senhor, vivo mais este dia.\\n Amén.",
        "schedule": "2018-11-15",
        "notification": "Oração da paz"
    }, {
        "data": "# Oração para o próximo\\nNo dia de hoje quando estiver indo para o trabalho, no ônibus voltando para casa, ou esperando o sinal abrir, se encha de todo amor que puder, escolha uma pessoa desconhecida na rua e pronuncie mentalmente a seguinte oração:\\n\"Meu Deus, despeje sobre esta pessoa toda a paz e alegria.\\nQue esta pessoa esteja livre de todo mal que habita este mundo.\\nQue esta pessoa tenha saúde.\\nE que se acabe toda a tristeza que reside em seu coração.\"\\nApós esta oração, feche os olhos e sinta a presença divina passando por você e se dirigindo a outra pessoa. Neste momento, tudo que você desejou para o seu próximo, veio em dobro para você.",
        "schedule": "2018-11-14",
        "notification": "Oração para o próximo"
    }, {
        "data": "# Abençoa este novo dia\\nMeu Deus, abençoa este novo dia.\\nAbençoa minha família, do mais jovem ao mais velho, que todos sintam a tua presença, pois sem eles eu não seria nada.\\nAbençoa meus melhores amigos e amigas, que estão comigo em todos os momentos, pois sem eles eu não seria nada.\\nAbençoa todos os que cruzarem o meu caminho, até mesmo meus inimigos, que eles encontrem a paz e aprendam que o amor é a resposta para todos os desentendimentos.\\nHoje o dia será longo e árduo, me dê força para enfrentar cada batalha, me encha de coragem para derrotar cada desafio, me encha de amor para fazer o bem.\\nAmén.",
        "schedule": "2018-11-13",
        "notification": "Abençoa este novo dia"
    }, {
        "data": "# Oração de bom dia\\n\\nDeus meu, abençoa esse novo dia. Me inspira ao bem e me concede a força necessária para resistir à minha própria inclinação ao mal.\\nQue o dia seja cheio de Tua graça e a minha alma se preencha de gratidão a ponto da Tua luz e Tua presença serem sentidas através de mim.\\nQue o dia seja cheio de Tua leveza. Que a Sua proteção não falhe e que os meus desejos me coloquem no caminho em que está firmado o plano de vida que o Senhor tem para mim.\\nAmén!",
        "schedule": "2018-11-10",
        "notification": "Oração de bom dia"
    }, {
        "data": "# Oração da Manhã\\n\\nSenhor, no início deste dia, venho Te pedir saúde, força, paz e sabedoria.\\n\\nQuero olhar hoje o mundo com olhos cheios de amor, ser paciente, compreensivo e prudente. Ver, além das aparências, ver teus filhos como Tu mesmo os vê, e assim ver o bem em cada um.\\n\\nFecha os meus ouvidos a toda a calúnia. Guarda a minha língua de toda a maldade. Que só de bênçãos se encha o meu espírito.\\n\\nQue eu seja tão bondoso e alegre, que todos quantos se aproximarem de mim, sintam a tua presença.\\n\\nSenhor, reveste-me da tua beleza, e que, no decurso deste dia, eu Te revele a todos.\\n\\nAmén.",
        "schedule": "2018-11-09",
        "notification": "Oração da Manhã"
    }, {
        "data": "# Oração Da Realização\\n\\nAgradeço por este novo dia, pelos pequenos e grandes dons que colocaste em nosso caminho a cada instante desta jornada.\\nAgradeço por descobrir que dar e receber são na verdade uma mesma coisa.\\nAgradeço até mesmo pelas dificuldades do caminho, porque sei que por trás de cada obstáculo há grande LUZ a ser revelada.\\n\\nQue Deus me ajude a ampliar minha visão e a perceber que minha realidade é fruto do foco dos meus pensamentos.\\nAssim, poderei lembrar que vejo o mundo e as pessoas não como elas são, mas como eu sou.\\nÉ minha decisão, a partir de agora, colocar o foco naquilo que é construtivo, e para tal me determino a plantar as mais positivas sementes.\\n\\nPeço força para desenvolver a virtude do desapego, para que possa lembrar que nada de material nos restará quando deixarmos este mundo físico.\\nÉ com humildade que abandono agora minhas expectativas, porque sei que meu poder é ilusório.\\nA força que guia minha vida vem de um lugar único, maravilhoso e muito acima do meu controle.\\nGuiado por essa força, jamais desistirei daquilo em que realmente acredito, da minha missão de levar luz ao mundo e aos que me cercam.\\n\\n_Autor: Ian Mecler_",
        "schedule": "2018-11-08",
        "notification": "Oração Da Realização"
    }
]

const _getImageAt = i =>
    DAILY_IMAGES[i % DAILY_IMAGES.length]

const _getDailyAt = i =>
    DAILY[i % DAILY.length]

export default {
    getTodaySDaily: (offset = 8) => {
        const daily = []
        const day = parseInt(+new Date() / (1000 * 60 * 60 * 24))

        for (let i = day; i > day - offset; i--) {
            if (i >= 0) {
                const _d = new Date();
                _d.setDate(_d.getDate() - (day - i));
                daily.push({
                    ..._getDailyAt(i),
                    ..._getImageAt(i),
                    schedule: DateFormat(_d, 'yyyy-mm-dd')
                })
            }
        }

        return daily
    }
}