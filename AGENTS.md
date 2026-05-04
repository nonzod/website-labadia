# La Badia Web Project

## Scopo di questo file

`AGENTS.md` contiene solo il contesto base, condiviso e stabile del progetto.
Le informazioni specifiche di singoli task, feature, schermate, integrazioni o decisioni temporanee vanno messe in file separati dentro `bot/`.
Obiettivo: avere nuovi contesti rapidi, puliti e subito operativi.

## Contesto prodotto

- Il progetto riguarda il sito web de La Badia, struttura ricettiva a San Venanzo, in Umbria.
- Il sito deve unire presentazione della dimora, racconto del luogo, valorizzazione del territorio e supporto alla conversione.
- Non va pensato come una semplice brochure: deve tenere insieme contenuti, fiducia, scoperta e contatto/prenotazione.

## Direzione tecnica

- Lo stack frontend di riferimento e `React`.
- Preferire un'architettura a componenti riusabili, con layout e sezioni condivise tra piu pagine.
- La base deve supportare bene sia pagine marketing/editoriali sia sezioni aggiornabili nel tempo.
- Sviluppo mobile-first, attenzione a performance, accessibilita e manutenibilita.

## Architettura funzionale di alto livello

- Il sito ruota attorno a due assi narrativi principali: ospitalita/dimora ed esperienze/territorio.
- Alcune pagine saranno pagine di ingresso o conversione, altre serviranno come contenuto condiviso, SEO locale o supporto editoriale.
- CTA, contatti, segnali di fiducia, contenuti sul territorio e moduli editoriali sono elementi trasversali da progettare come primitive riusabili.
- Evitare di costruire componenti o struttura dati troppo legati a una singola pagina o a un solo task.

## Vincoli e requisiti trasversali

- Il progetto va pensato fin dall'inizio con supporto `IT` e `EN`.
- SEO tecnico e semantica non sono un'aggiunta finale: URL puliti, metadata, heading corretti, contenuti strutturati e buona gestione delle immagini fanno parte della base.
- La conversione deve essere sempre semplice: prenotazione, richiesta informazioni e contatti diretti devono poter emergere in modo coerente in piu punti del sito.
- E un progetto fortemente guidato da contenuti e immagini: servono componenti adatti a media ricchi, testi lunghi e blocchi modulari.
- Le aree che richiedono aggiornamenti nel tempo devono essere progettate con una struttura semplice da mantenere.

## Direzione visuale condivisa

- Il tono deve essere autentico, caldo, curato e non istituzionale.
- Evitare l'estetica generica da template hospitality.
- La UI deve valorizzare fotografia, atmosfera, materia, territorio e storytelling.
- Le scelte visuali devono restare coerenti e sistemiche: meglio token, varianti e componenti condivisi che styling isolato pagina per pagina.

## Fonti di riferimento

- Analisi architetturale di partenza: `analisi/remixed-c8b29026.html`
- Task specifici e contesti piu dettagliati: directory `bot/`
