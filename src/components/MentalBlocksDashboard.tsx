import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';


interface Pergunta {
  texto: string;
  tipo: 'texto' | 'textarea' | 'select' | 'radio' | 'check';
  opcoes?: string[];
  placeholder?: string;
  gridSpan?: 'full' | 'half' | 'third';
  subPergunta?: string;
  mostrarSubSempre?: boolean;
  triggerSub?: string;
}

interface Secao {
  titulo: string;
  fase?: string;
  perguntas: Pergunta[];
}

const secoesMap: Secao[] = [
  {
    titulo: "DADOS PESSOAIS",
    perguntas: [
      { texto: "Nome", tipo: 'texto', gridSpan: 'full' },
      { texto: "RG / CPF", tipo: 'texto', gridSpan: 'half', placeholder: "Ex: 12.345.678-9 / 123.456.789-00" },
      { texto: "Data de nascimento", tipo: 'texto' },
      { texto: "Estado civil", tipo: 'texto' },
      { texto: "Endereço, Bairro, CEP, Cidade e Estado", tipo: 'texto', gridSpan: 'full', placeholder: "Ex: Rua das Flores, 123 - Centro - CEP 12345-678 - São Paulo - SP" },
      { texto: "Celular", tipo: 'texto' },
      { texto: "E-mail", tipo: 'texto', gridSpan: 'full' },
      { texto: "Profissão, Empresa, Atividade e Cargo", tipo: 'texto', gridSpan: 'full', placeholder: "Ex: Administrador na Empresa ABC, atuando na gestão comercial como Diretor" },
      { texto: "Religião", tipo: 'texto' },
      { texto: "Escolaridade", tipo: 'texto' },
      { texto: "Queixa Principal – O que te trouxe até aqui?", tipo: 'textarea', gridSpan: 'full', placeholder: "Descreva o que te motivou a buscar ajuda..." },
    ],
  },
  {
    titulo: "FASE 01 — VIDA PESSOAL",
    fase: "FASE 01",
    perguntas: [
      { texto: "É casada (o), solteira (o) ou divorciada (o)?", tipo: 'radio', opcoes: ["Casada(o)", "Solteira(o)", "Divorciada(o)"], gridSpan: 'full' },
      { texto: "Se é divorciada (o), por qual motivo e como se sente?", tipo: 'textarea', gridSpan: 'full' },
      { texto: "Tem filhos? Se sim, relate a quantidade, como é o relacionamento e se há alguma frustração em relação a eles.", tipo: 'textarea', gridSpan: 'full', placeholder: "Descreva a quantidade, relação com os filhos e se sente alguma frustração..." },
      { texto: "Como você se sente em seu relacionamento com cônjuge/parceira (o)? Há frustrações na relação?", tipo: 'textarea', gridSpan: 'full', placeholder: "Descreva seu relacionamento atual e eventuais frustrações..." },
      { texto: "Como você se sente em sua casa, dentro do contexto familiar?", tipo: 'textarea', gridSpan: 'full' },
      { texto: "Como você se sente no seu trabalho / profissão e se há alguma frustração?", tipo: 'textarea', gridSpan: 'full', placeholder: "Descreva seu sentimento profissional e se há alguma frustração..." },
      { texto: "Você se sente pertencendo ao Contexto Familiar, Social ou Religioso?", tipo: 'radio', opcoes: ["Sim", "Não"], subPergunta: "Por quê?", mostrarSubSempre: true, gridSpan: 'full' },
      { texto: "Sente alguma frustração em relação à sua Identidade Sexual ou Vida Sexual?", tipo: 'radio', opcoes: ["Sim", "Não"], subPergunta: "Por quê?", mostrarSubSempre: true, gridSpan: 'full' },
      { texto: "Iniciou sua sexualidade com que idade?", tipo: 'texto' },
      { texto: "Como foi sua primeira vez?", tipo: 'radio', opcoes: ["Traumática", "Normal", "Boa", "Satisfatória"] },
      { texto: "Atualmente se realiza nas relações sexuais ou tem algum problema relacionado ao sexo?", tipo: 'textarea', gridSpan: 'full', placeholder: "Descreva sua realização íntima e se há alguma dificuldade ou problema..." },
      { texto: "O sexo para você é algo:", tipo: 'radio', opcoes: ["Importante", "Sem importância", "Muito importante"] },
      { texto: "Tem algum medo ou fobia?", tipo: 'radio', opcoes: ["Sim", "Não"], subPergunta: "De quê?", gridSpan: 'full' },
      { texto: "Faz uso de cigarro, bebidas alcoólicas ou outras drogas?", tipo: 'radio', opcoes: ["Sim", "Não"], subPergunta: "Quais?", mostrarSubSempre: true, gridSpan: 'full' },
      { texto: "Dores de cabeça ou Insônia frequente?", tipo: 'radio', opcoes: ["Sim", "Não"], subPergunta: "Qual a frequência de cada um?", mostrarSubSempre: true, gridSpan: 'full' },
      { texto: "Tem ideias suicidas?", tipo: 'radio', opcoes: ["Sim", "Não"], subPergunta: "Quais?", gridSpan: 'full' },
      { texto: "Está grávida?", tipo: 'radio', opcoes: ["Sim", "Não"], subPergunta: "Quantas semanas?" },
      { texto: "Qual o seu nível de stress?", tipo: 'radio', opcoes: ["Alto", "Médio", "Baixo"] },
      { texto: "Atualmente está tomando alguma medicação?", tipo: 'radio', opcoes: ["Sim", "Não"], subPergunta: "Qual?" },
      { texto: "Já consultou psicólogo/psiquiatra ou possui algum diagnóstico emocional?", tipo: 'radio', opcoes: ["Sim", "Não"], subPergunta: "Qual diagnóstico ou motivo de consulta?", mostrarSubSempre: true, gridSpan: 'full' },
      { texto: "Qual a quantidade de amigos que possui e qual seu passatempo preferido?", tipo: 'texto', gridSpan: 'full', placeholder: "Ex: Tenho 5 amigos e gosto de ler e caminhar" },
      { texto: "Qual a crença que as pessoas possuem sobre você que mais se repete?", tipo: 'textarea', gridSpan: 'full' },
      { texto: "Você se considera feliz?", tipo: 'radio', opcoes: ["Sim", "Não"], subPergunta: "Por quê?", mostrarSubSempre: true, gridSpan: 'full' },
      { texto: "O que você mudaria em si mesma(o) ou no seu comportamento atual?", tipo: 'textarea', gridSpan: 'full' },
      { texto: "Defina o que é a vida em apenas uma frase", tipo: 'textarea', gridSpan: 'full' },
      { texto: "Traumas ou fatos marcantes desta fase (Vida Pessoal):", tipo: 'textarea', gridSpan: 'full', placeholder: "Descreva traumas ou fatos que marcaram profundamente sua vida pessoal..." },
    ],
  },
  {
    titulo: "FASE 02 — MENTAL",
    fase: "FASE 02",
    perguntas: [
      { texto: "Quais são os tipos de pensamentos que alimenta em relação a si mesma(o) (Geral e Aparência Física)?", tipo: 'radio', opcoes: ["Positivos", "Negativos"], subPergunta: "Quais exatamente?", mostrarSubSempre: true, gridSpan: 'full' },
      { texto: "Quais são os tipos de pensamentos que alimenta sobre si (Competência Profissional e Financeira)?", tipo: 'radio', opcoes: ["Positivos", "Negativos"], subPergunta: "Quais exatamente?", mostrarSubSempre: true, gridSpan: 'full' },
      { texto: "Quais são os tipos de pensamentos que alimenta sobre si (Vida Emocional)?", tipo: 'radio', opcoes: ["Positivos", "Negativos"], subPergunta: "Quais exatamente?", mostrarSubSempre: true, gridSpan: 'full' },
      { texto: "Quais são os tipos de pensamentos que alimenta sobre si (Seu Passado e Futuro)?", tipo: 'radio', opcoes: ["Positivos", "Negativos"], subPergunta: "Quais exatamente?", mostrarSubSempre: true, gridSpan: 'full' },
      { texto: "Qual sua visão sobre você?", tipo: 'textarea', gridSpan: 'full' },
    ],
  },
  {
    titulo: "FASE 03 — INFÂNCIA",
    fase: "FASE 03",
    perguntas: [
      { texto: "Você foi criado pelos pais?", tipo: 'radio', opcoes: ["Sim", "Não"] },
      { texto: "Como é ou era o seu relacionamento com seu Pai e com sua Mãe?", tipo: 'textarea', gridSpan: 'full', placeholder: "Descreva seu relacionamento com ambos..." },
      { texto: "Seus pais eram agressivos, muito bravos ou usavam bebidas/drogas?", tipo: 'radio', opcoes: ["Sim", "Não"], subPergunta: "Quem e de quais formas?", mostrarSubSempre: true, gridSpan: 'full' },
      { texto: "Como você descreveria o relacionamento entre seus pais?", tipo: 'radio', opcoes: ["Excelente", "Muito Bom", "Bom", "Regular", "Péssimo"], subPergunta: "Por quê?", mostrarSubSempre: true, gridSpan: 'full' },
      { texto: "Da relação de seus pais, o que você hoje repete ou está determinada(o) a NÃO repetir em sua vida?", tipo: 'textarea', gridSpan: 'full' },
      { texto: "Qual a crença que você adquiriu em relação a relacionamentos?", tipo: 'textarea', gridSpan: 'full' },
      { texto: "Na infância, era obrigada (o) a fazer alguma coisa que lhe desagradava?", tipo: 'radio', opcoes: ["Sim", "Não"] },
      { texto: "Dormia com a luz acesa ou apagada?", tipo: 'radio', opcoes: ["Acesa", "Apagada"] },
      { texto: "Como foi sua adolescência?", tipo: 'radio', opcoes: ["Ruim", "Boa", "Ótima"] },
      { texto: "Teve fase de rebeldia na adolescência?", tipo: 'radio', opcoes: ["Sim", "Não"] },
      { texto: "Com qual de seu pais você tinha mais dificuldade de relacionamento?", tipo: 'radio', opcoes: ["Pai", "Mãe", "Ambos"] },
      { texto: "Qual a filosofia de sua família em relação ao Sucesso Profissional e Dinheiro?", tipo: 'texto', gridSpan: 'full' },
      { texto: "Qual a filosofia de sua família em relação ao Amor?", tipo: 'texto', gridSpan: 'full' },
      { texto: "O que era para você ser uma(um) boa(bom) menina(o) e como deveria agir para se sentir amada(o)?", tipo: 'textarea', gridSpan: 'full', placeholder: "Descreva no que acreditava e o que precisava fazer..." },
      { texto: "Possui irmãos? Se sim, relate a quantidade, como é o relacionamento e eventuais frustrações.", tipo: 'textarea', gridSpan: 'full', placeholder: "Descreva seu relacionamento com irmão(s) e se há frustrações..." },
      { texto: "Você foi uma criança introvertida ou extrovertida?", tipo: 'radio', opcoes: ["Introvertida", "Extrovertida"] },
      { texto: "Como era o seu período escolar e relacionamento com colegas? Havia dificuldades ou frustrações?", tipo: 'textarea', gridSpan: 'full', placeholder: "Descreva sua experiência na escola, relacionamento social com colegas e eventuais frustrações..." },
      { texto: "Quais eram seus maiores medos na infância?", tipo: 'textarea', gridSpan: 'full' },
      { texto: "Traumas, perdas, mágoas ou fatos que marcaram profundamente sua infância:", tipo: 'textarea', gridSpan: 'full', placeholder: "Descreva sentimentos de mágoa, tristeza, perdas de entes queridos, fatos marcantes ou traumas de infância..." }
    ],
  },
  {
    titulo: "FASE 04 — EMOCIONAL",
    fase: "FASE 04",
    perguntas: [
      { texto: "Quais são seus maiores medos hoje?", tipo: 'textarea', gridSpan: 'full' },
      { texto: "Como foi o seu primeiro relacionamento amoroso?", tipo: 'textarea', gridSpan: 'full' },
      { texto: "Quem você considera o real culpado ou responsável pelas dificuldades ou problemas que acontecem na sua vida hoje?", tipo: 'radio', opcoes: ["Vítima", "Responsável"], subPergunta: "Quem? Por quê?", mostrarSubSempre: true, gridSpan: 'full' },
      { texto: "Se considera vitoriosa(o) ou derrotada(o)?", tipo: 'radio', opcoes: ["Vitoriosa(o)", "Derrotada(o)"] },
      { texto: "Nos relacionamentos e na vida, você prefere ser:", tipo: 'radio', opcoes: ["Dominante", "Submisso"] },
      { texto: "Você se considera uma pessoa controladora ou acumula raiva, mágoas e ressentimentos de alguém?", tipo: 'radio', opcoes: ["Sim", "Não"], subPergunta: "Por quê? De quem?", mostrarSubSempre: true, gridSpan: 'full' },
      { texto: "Sente-se de alguma forma pressionada(o) ou inferiorizada(o)/duvidando de sua capacidade atualmente?", tipo: 'radio', opcoes: ["Sim", "Não"], subPergunta: "De que maneira / Em quais momentos?", mostrarSubSempre: true, gridSpan: 'full' },
      { texto: "Você é audaciosa (o), corre atrás de suas metas, ou é auto protetor(a), preferindo se poupar dos eventuais riscos?", tipo: 'radio', opcoes: ["Audaciosa(o)", "Auto protetor(a)"], gridSpan: 'full' },
      { texto: "Existe algo que a(o) faz sentir-se culpada(o)?", tipo: 'radio', opcoes: ["Sim", "Não"], subPergunta: "O que exatamente?", gridSpan: 'full' },
      { texto: "Traumas ou fatos marcantes desta fase (Emocional):", tipo: 'textarea', gridSpan: 'full' },
    ],
  },
];

const emocoesList = [
  "Raiva", "Medo de algo concreto", "Medos vagos", "Culpa", "Revolta", "Medo de perder o controle", "Tristeza", "Mágoa", "Orgulho", "Ódio", "Egoísmo", "Ansiedade", "Intolerância", "Submissão", "Indecisão", "Desespero", "Desânimo", "Covardia", "Egocentrismo", "Ciúme", "Frustração", "Nostalgia", "Cansaço", "Impaciência", "Angústia", "Timidez", "Apatia", "Ressentimento", "Solidão", "Autoritarismo", "Rejeição", "Abandono", "Humilhação", "Traição", "Injustiça"
];

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <motion.svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    animate={{ 
      scale: [1, 1.25, 1, 1.25, 1],
    }}
    transition={{
      duration: 1.6,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
      times: [0, 0.15, 0.3, 0.45, 1]
    }}
  >
    <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.868.513 3.616 1.402 5.127l-1.353 4.965 5.093-1.332a9.927 9.927 0 004.862 1.258C17.525 22.022 22 17.524 22 12.004 22 6.48 17.522 2 12.004 2zM12 20.378c-1.636 0-3.197-.47-4.524-1.355l-.324-.2-.294.077-2.983.78.795-2.915.088-.323-.18-.306A8.342 8.342 0 013.626 12c0-4.618 3.757-8.374 8.378-8.374s8.374 3.756 8.374 8.374c0 4.62-3.754 8.378-8.378 8.378zm4.56-6.23c-.25-.124-1.474-.727-1.703-.81-.229-.083-.395-.124-.563.124-.166.25-.644.81-.79 1-.144.186-.29.207-.54.083a6.8 6.8 0 01-1.996-1.232c-.777-.692-1.3-1.55-1.453-1.8-.153-.25-.016-.385.11-.51.11-.11.25-.29.375-.436.126-.145.166-.25.25-.415.084-.167.042-.31-.02-.436-.064-.125-.563-1.357-.77-1.854-.203-.49-.41-.422-.563-.43-.146-.007-.312-.007-.478-.007s-.436.062-.665.31C8.163 7.846 7.5 8.498 7.5 9.816s.956 2.592 1.09 2.772c.135.18 1.88 2.872 4.555 4.025.637.275 1.134.438 1.522.56.64.204 1.223.175 1.683.107.514-.077 1.474-.602 1.683-1.183.208-.58.208-1.08.146-1.18-.063-.105-.23-.167-.48-.29z" />
  </motion.svg>
);

export default function MentalBlocksDashboard() {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [emocional, setEmocional] = useState<Record<string, number>>(() => {
    const savedEmocional = localStorage.getItem('anamnese_emocional');
    return savedEmocional ? JSON.parse(savedEmocional) : emocoesList.reduce((acc, emocao) => ({ ...acc, [emocao]: 0 }), {});
  });

  // Load from localStorage with migration
  useEffect(() => {
    const savedAnswers = localStorage.getItem('anamnese_respostas');
    if (savedAnswers) {
      let parsed = JSON.parse(savedAnswers);
      
      const unifiedKey = "Endereço, Bairro, CEP, Cidade e Estado";
      const oldAddressKey = "Endereço, Bairro e CEP";
      const oldCityStateKey = "Cidade e Estado";
      const oldStateKey = "Endereço, Bairro, CEP, Cidade e State";
      
      // Migrate old split strings or incorrect keys during local storage load
      if (parsed[oldStateKey] && !parsed[unifiedKey]) {
        parsed[unifiedKey] = parsed[oldStateKey];
      }
      
      if (!parsed[unifiedKey] && (parsed[oldAddressKey] || parsed[oldCityStateKey])) {
        const parts = [];
        if (parsed[oldAddressKey]) parts.push(parsed[oldAddressKey]);
        if (parsed[oldCityStateKey]) parts.push(parsed[oldCityStateKey]);
        parsed[unifiedKey] = parts.join(" - ");
      }
      
      setAnswers(parsed);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('anamnese_respostas', JSON.stringify(answers));
    localStorage.setItem('anamnese_emocional', JSON.stringify(emocional));
  }, [answers, emocional]);

  const handleAnswerChange = (pergunta: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [pergunta]: value,
    }));
  };

  const toggleCheck = (pergunta: string, opcao: string) => {
    const current = (answers[pergunta] as string[]) || [];
    const updated = current.includes(opcao)
      ? current.filter(item => item !== opcao)
      : [...current, opcao];
    handleAnswerChange(pergunta, updated);
  };

  const handlePrint = () => {
    window.print();
  };

  const finalizaWhatsApp = () => {
    const numero = "556492099436";
    
    let msg = "*ANAMNESE TERAPÊUTICA*\n\n";
    
    // Identificação Inicial
    msg += `*Nome:* ${answers["Nome"] || "---"}\n`;
    msg += `*Telefone:* ${answers["Celular"] || answers["Telefone residencial"] || "---"}\n`;
    msg += `*Endereço:* ${answers["Endereço, Bairro, CEP, Cidade e Estado"] || "---"}\n\n`;
    
    msg += `*Queixa Principal:*\n${answers["Queixa Principal – O que te trouxe até aqui?"] || answers["O que te trouxe até aqui?"] || "---"}\n\n`;

    // Mapeamento de todas as seções
    secoesMap.forEach(s => {
      // Pula dados já incluídos no topo
      if (s.titulo === "DADOS PESSOAIS" || s.titulo === "QUEIXA PRINCIPAL") return;

      msg += `*--- ${s.titulo} ${s.fase ? '(' + s.fase + ')' : ''} ---*\n`;
      s.perguntas.forEach(p => {
        const resp = answers[p.texto];
        const det = answers[`${p.texto}_detalhes`];
        
        if (resp || det) {
          msg += `*${p.texto}:* `;
          if (Array.isArray(resp)) {
            msg += resp.join(', ');
          } else if (resp) {
            msg += resp;
          }
          
          if (det) msg += ` (Obs/Trauma: ${det})`;
          msg += "\n";
        }
      });
      msg += "\n";
    });

    msg += "*--- MAPA EMOCIONAL ---*\n";
    Object.entries(emocional).forEach(([emo, val]) => {
      const valor = val as number;
      if (valor > 0) msg += `*${emo}:* ${valor}/10\n`;
    });

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#faf7f8] p-4 md:p-12 font-sans overflow-x-hidden selection:bg-[#c78fa7] selection:text-white">
      {/* 🌷 DECORAÇÃO DE FUNDO 🌷 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#c78fa7] blur-[150px] opacity-[0.08]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#c78fa7] blur-[150px] opacity-[0.08]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 print:max-w-full print:mx-0">
        


        {/* TOP BRANDING: APENAS O NOME */}
        <div className="flex flex-col items-center pt-8 pb-4 text-center print:pt-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-1"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-[#032347]">
              Gisélia Gomes
            </h1>
            <p className="text-xs sm:text-sm font-bold text-[#c78fa7] tracking-[0.4em] uppercase">
              TERAPEUTA
            </p>
          </motion.div>
        </div>

        {/* HEADER INDICATOR */}
        <div className="text-center mb-16 md:mb-20 space-y-6 pt-4">
            <h2 className="text-[#032347] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-[0.3em] leading-tight">
                Formulário de Anamnese
            </h2>
            <div className="h-1 w-24 sm:w-32 bg-[#c78fa7]/40 mx-auto rounded-full" />
        </div>

        {/* IMPORTÂNCIA DA TERAPIA TRG */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(199,143,167,0.06)] border border-[#ead5df]/40 p-8 md:p-12 mb-16 md:mb-20 text-left max-w-4xl mx-auto print:shadow-none print:border-none print:bg-transparent print:p-0"
        >
          <h3 className="text-[#032347] font-black text-lg md:text-xl uppercase tracking-[0.25em] mb-4 text-center">
            Importância da Terapia TRG
          </h3>
          <div className="h-0.5 w-12 bg-[#c78fa7]/50 mx-auto mb-6 rounded-full" />
          <p className="text-[#032347]/80 font-medium text-sm md:text-base leading-relaxed text-left max-w-3xl mb-8 pb-8 border-b border-[#ead5df]/30 print:mb-4 print:pb-4 print:border-none">
            A Terapia TRG (Terapia de Reprocessamento Generativo) é um processo terapêutico voltado ao reprocessamento de emoções associadas a traumas, medos, ansiedade, estresse e experiências difíceis vividas ao longo da vida. Quando essas emoções permanecem ativas, elas podem influenciar diretamente pensamentos, comportamentos, relações e a forma como a pessoa vivencia o seu dia a dia. O processo terapêutico atua na reorganização dessas experiências emocionais, reduzindo o sofrimento interno e promovendo maior equilíbrio, clareza, amadurecimento emocional e respostas mais saudáveis diante da vida.
          </p>

          {/* BENEFÍCIOS E RESULTADOS */}
          <div className="space-y-6 print:break-inside-avoid">
            <div className="text-left py-4 border-t border-[#ead5df]/30 print:border-none">
              <h4 className="text-[#032347] font-black text-sm sm:text-base tracking-[0.2em] uppercase leading-relaxed text-left max-w-3xl">
                Entre os principais benefícios e resultados, destacam-se:
              </h4>
            </div>

            <ul className="max-w-3xl space-y-4 md:space-y-5">
              {[
                "Redução da ansiedade e do estresse emocional;",
                "Melhora da autoestima e da autoconfiança;",
                "Alívio de medos, traumas e lembranças dolorosas;",
                "Mais equilíbrio emocional no dia a dia;",
                "Melhora nos relacionamentos pessoais e familiares;",
                "Sensação de leveza emocional e clareza mental;",
                "Auxílio no controle de pensamentos negativos;",
                "Mais disposição para viver, trabalhar e tomar decisões."
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.4 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#fdeff4] border border-[#ead5df] text-[#c78fa7] group-hover:scale-105 transition-transform mt-0.5 shadow-xs">
                    <Check className="w-3.5 h-3.5" strokeWidth={3.5} />
                  </div>
                  <span className="text-[#032347]/80 font-medium text-sm md:text-base leading-relaxed">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CONTINUIDADE TEXT */}
          <div className="mt-10 pt-10 border-t border-[#ead5df]/40 space-y-6 print:break-inside-avoid">
            <p className="text-[#032347]/80 font-medium text-sm md:text-base leading-relaxed text-left max-w-3xl">
              A terapia não apaga o passado, mas ajuda a pessoa a olhar para suas experiências de uma forma mais saudável e menos dolorosa. Muitas pessoas relatam que, após o processo terapêutico, conseguem dormir melhor, sentir mais paz interior e reagir às dificuldades com mais tranquilidade.
            </p>
            <p className="text-[#032347]/90 font-semibold text-sm md:text-base leading-relaxed text-left max-w-3xl">
              Cuidar da saúde emocional é tão importante quanto cuidar da saúde física. Quando a mente encontra equilíbrio, a vida se torna mais leve, saudável e produtiva.
            </p>
          </div>
        </motion.div>

        {/* MAPPING SECTIONS */}
        <div className="space-y-16 md:space-y-24">
          {secoesMap.map((secao, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(199,143,167,0.1)] border border-[#ead5df]/40 overflow-hidden group hover:shadow-[0_30px_60px_rgba(199,143,167,0.15)] transition-shadow duration-700 print:shadow-none print:border-none print:rounded-none"
            >
              {/* SECTION HEADER */}
              <div className="bg-[#faf7f8]/50 px-8 md:px-12 py-8 md:py-10 border-b border-[#ead5df]/30">
                <div>
                  {secao.fase && (
                    <span className="text-[#c78fa7] font-black text-[10px] md:text-xs tracking-[0.4em] uppercase block mb-3 opacity-60">
                      {secao.fase}
                    </span>
                  )}
                  <h3 className="text-[#032347] font-black text-2xl md:text-3xl uppercase tracking-[0.15em]">
                    {secao.titulo}
                  </h3>
                </div>
              </div>

              {/* QUESTIONS GRID */}
              <div className="p-8 md:p-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                  {secao.perguntas.map((p, pIdx) => {
                    const spanClass = p.gridSpan === 'full' ? 'md:col-span-full' : p.gridSpan === 'half' ? 'md:col-span-1 lg:col-span-2' : '';
                    
                    return (
                      <div key={pIdx} className={`${spanClass} space-y-4 print:break-inside-avoid`}>
                        <label className="block text-[#032347] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] leading-relaxed pl-1">
                          {p.texto}
                        </label>

                        {p.tipo === 'texto' && (
                          <input
                            type="text"
                            value={answers[p.texto] || ""}
                            onChange={(e) => handleAnswerChange(p.texto, e.target.value)}
                            className="w-full bg-[#faf7f8]/30 border border-[#ead5df] rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-[#c78fa7]/10 focus:border-[#c78fa7] text-[#032347] font-medium transition-all duration-300 placeholder:text-gray-300"
                            placeholder={p.placeholder || "Digite aqui..."}
                          />
                        )}

                        {p.tipo === 'textarea' && (
                          <textarea
                            rows={5}
                            value={answers[p.texto] || ""}
                            onChange={(e) => handleAnswerChange(p.texto, e.target.value)}
                            className="w-full bg-[#faf7f8]/30 border border-[#ead5df] rounded-3xl px-6 py-5 outline-none focus:ring-4 focus:ring-[#c78fa7]/10 focus:border-[#c78fa7] text-[#032347] font-medium transition-all duration-300 placeholder:text-gray-300 resize-none"
                            placeholder={p.placeholder || "Sua resposta detalhada..."}
                          />
                        )}

                        {p.tipo === 'select' && (
                          <select
                            value={answers[p.texto] || ""}
                            onChange={(e) => handleAnswerChange(p.texto, e.target.value)}
                            className="w-full bg-[#faf7f8]/30 border border-[#ead5df] rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-[#c78fa7]/10 focus:border-[#c78fa7] text-[#032347] font-medium transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23c78fa7%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right:1.5rem_center] bg-no-repeat"
                          >
                            <option value="">Selecione uma opção...</option>
                            {p.opcoes?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        )}

                        {p.tipo === 'radio' && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-2 max-w-sm">
                              {p.opcoes?.map(opt => (
                                <button
                                  key={opt}
                                  onClick={() => handleAnswerChange(p.texto, answers[p.texto] === opt ? "" : opt)}
                                  className={`w-full text-center px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border transition-all duration-300 ${
                                    answers[p.texto] === opt 
                                      ? 'bg-[#c78fa7] border-[#c78fa7] text-white shadow-[0_10px_20px_rgba(199,143,167,0.3)] scale-105' 
                                      : 'bg-white border-[#c78fa7]/30 text-[#c78fa7]/70 hover:border-[#c78fa7] hover:bg-[#c78fa7]/5'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                            
                            {/* CAMPO CONDICIONAL PARA SUBPERGUNTA */}
                            {p.subPergunta && (
                              p.mostrarSubSempre 
                                ? true 
                                : answers[p.texto] === (p.triggerSub || "Sim")
                            ) && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="pl-4 border-l-2 border-[#c78fa7]/30 pt-2 w-full"
                              >
                                <label className="block text-[#032347] font-bold text-[10px] uppercase tracking-[0.2em] mb-2 opacity-70">
                                  {p.subPergunta}
                                </label>
                                {p.texto === "Possui algum trauma?" || p.subPergunta.toLowerCase().includes("por qu") ? (
                                  <textarea
                                    value={answers[`${p.texto}_detalhes`] || ""}
                                    onChange={(e) => handleAnswerChange(`${p.texto}_detalhes`, e.target.value)}
                                    rows={3}
                                    className="w-full bg-white border border-[#ead5df] rounded-xl px-5 py-3 outline-none focus:ring-4 focus:ring-[#c78fa7]/10 focus:border-[#c78fa7] text-[#032347] font-medium transition-all duration-300 placeholder:text-gray-200 resize-none"
                                    placeholder="Descreva o porquê..."
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    value={answers[`${p.texto}_detalhes`] || ""}
                                    onChange={(e) => handleAnswerChange(`${p.texto}_detalhes`, e.target.value)}
                                    className="w-full bg-white border border-[#ead5df] rounded-xl px-5 py-3 outline-none focus:ring-4 focus:ring-[#c78fa7]/10 focus:border-[#c78fa7] text-[#032347] font-medium transition-all duration-300 placeholder:text-gray-200"
                                    placeholder="Especifique aqui..."
                                  />
                                )}
                              </motion.div>
                            )}
                          </div>
                        )}

                        {p.tipo === 'check' && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {p.opcoes?.map(opt => (
                              <button
                                key={opt}
                                onClick={() => toggleCheck(p.texto, opt)}
                                className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
                                  (answers[p.texto] as string[])?.includes(opt)
                                    ? 'bg-[#c78fa7]/10 border-[#c78fa7] text-[#c78fa7]' 
                                    : 'bg-white border-[#ead5df] text-[#032347]/40 hover:border-[#c78fa7]'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MAPA EMOCIONAL FINAL */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-32 md:mt-48 print:mt-10"
        >
          <div className="text-center mb-20">
            <h2 className="text-[#032347] text-4xl md:text-6xl font-black uppercase tracking-[0.3em] mb-6">
              Mapa Emocional
            </h2>
          </div>

          <div className="bg-white rounded-[4rem] shadow-2xl border border-[#ead5df]/40 p-10 md:p-20 print:shadow-none print:border-none print:p-0">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12">
                {emocoesList.map(emo => (
                  <div key={emo} className="space-y-4 group print:break-inside-avoid">
                    <div className="flex justify-between items-center px-1">
                        <span className="text-[#032347] font-black uppercase text-[10px] md:text-xs tracking-[0.2em] group-hover:text-[#c78fa7] transition-colors">
                            {emo}
                        </span>
                        <span className="text-[#c78fa7] font-black text-xs md:text-sm">
                            {emocional[emo]}
                        </span>
                    </div>
                    <div className="relative h-2 flex items-center">
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={emocional[emo]}
                            onChange={(e) => setEmocional(prev => ({ ...prev, [emo]: Number(e.target.value) }))}
                            className="w-full h-1 bg-[#ead5df] rounded-full appearance-none cursor-pointer accent-[#c78fa7] z-10"
                        />
                        <div 
                          className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-[#c78fa7] rounded-full brightness-110 shadow-[0_0_15px_rgba(199,143,167,0.4)] pointer-events-none transition-all duration-300"
                          style={{ width: `${emocional[emo] * 10}%` }}
                        />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </motion.div>

        {/* ACTIONS */}
        <div className="mt-32 mb-20 flex flex-col items-center space-y-8 print:hidden">
            <div className="flex flex-wrap justify-center gap-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrint}
                    className="bg-[#032347] hover:bg-[#05356c] text-white px-10 py-5 rounded-3xl font-black text-xs md:text-sm uppercase tracking-[0.3em] shadow-xl transition-all duration-300 cursor-pointer"
                >
                    Imprimir / Salvar PDF
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={finalizaWhatsApp}
                    className="flex items-center gap-3 bg-[#c78fa7] hover:bg-[#b97d98] text-white px-12 py-5 rounded-3xl font-black text-xs md:text-sm uppercase tracking-[0.3em] shadow-xl transition-all duration-300 cursor-pointer group"
                >
                    <WhatsAppIcon className="w-5 h-5" />
                    Finalizar por WhatsApp
                </motion.button>
            </div>
            <p className="text-[#c78fa7]/50 text-[10px] uppercase font-bold tracking-widest animate-pulse">
                Auto-salvamento ativado
            </p>
        </div>

      </div>

      {/* PRINT STYLES */}
      <style>{`
        @media print {
          body { background: white !important; }
          .min-h-screen { background: white !important; padding: 0 !important; }
          .max-w-5xl { max-width: 100% !important; }
          input, textarea, select { border: none !important; border-bottom: 1px solid #ead5df !important; border-radius: 0 !important; padding-left: 0 !important; background: transparent !important; }
          .rounded-[3rem], .rounded-[4rem] { border-radius: 0 !important; box-shadow: none !important; border: none !important; }
          .bg-[#faf7f8] { background: transparent !important; }
          button { display: none !important; }
          input[type=range] { display: none !important; }
          .h-1.bg-[#ead5df] { background: #eee !important; }
          .bg-[#c78fa7] { background: #c78fa7 !important; -webkit-print-color-adjust: exact; }
          .text-white { color: white !important; }
          .print-break-inside-avoid { break-inside: avoid; }
        }
      `}</style>
    </div>
  );
}

