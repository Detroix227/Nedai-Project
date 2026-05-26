# CHAPTER ONE

## 1.1 Background of the Study

Education has always been one of the most powerful tools for human development, and nowhere is this more apparent than in Nigeria — a country of over 220 million people where the demand for quality education far outpaces the supply of qualified teachers and adequate learning resources. From crèche to the doctoral level, Nigerian learners at every stage face a common challenge: getting timely, personalized academic support when they need it most (Babalola & Bamidele, 2024).

The traditional classroom, for all its value, has structural limitations. A single teacher managing 40 to 80 students cannot realistically give every learner the individual attention they need. Students who fall behind in a topic often remain behind because there is no mechanism for immediate remediation outside of class hours. Private tutoring exists as a solution, but it is expensive and geographically unequal — accessible to students in urban centers but largely unavailable to those in rural communities and underserved states. The result is a widening academic gap (Adebayo, Ibrahim, & Yusuf, 2024).

Artificial intelligence has in recent years begun to offer a credible response to this problem. Intelligent Tutoring Systems (ITS) — software platforms that use AI to deliver instruction, provide feedback, and adapt to a learner's pace — have been shown in multiple large-scale studies to produce learning outcomes comparable to one-on-one human tutoring (Kulik & Fletcher, 2016; Ma et al., 2014; Chen, Wang, & Zhang, 2024). These systems do not tire, do not judge, and are available at any hour. For a country like Nigeria, where the pupil-to-teacher ratio at the primary level alone stands at approximately 36:1 (UNESCO Institute for Statistics, 2023), this kind of scalable, always-available support is a necessity.

However, existing AI tutoring tools were not built with the Nigerian learner in mind. Platforms like Khan Academy follow the United States Common Core curriculum. ChatGPT and similar general-purpose language models can answer questions, but they are not grounded in any specific curriculum, meaning they can produce responses that are factually plausible but educationally misleading — a problem researchers have termed "hallucination" (Lewis et al., 2020; Maity & Deroy, 2024). Okeke and Mba (2025) note that Western-trained AI models often fail contextually when deployed in sub-Saharan educational systems because they lack localized knowledge. None of these global tools align with the syllabi prescribed by the National Educational Research and Development Council (NERDC), the examination formats of the West African Examinations Council (WAEC), or the Benchmark Minimum Academic Standards (BMAS) set by the National Universities Commission (NUC).

There is also an emotional dimension to learning that technology has historically underestimated. Research has consistently shown that a student's willingness to engage, their anxiety levels, and their sense of being understood by their learning environment all significantly influence academic outcomes (Pekrun, 2006; Wang & Xu, 2025). An AI tutor that responds only to the content of a question, without any awareness of the emotional state of the person asking it, misses a critical part of teaching.

It is against this backdrop that **NedAI** was developed. NedAI is an AI-powered tutoring system built to serve Nigerian learners across the full spectrum of the country's education system. The system uses a technique known as Retrieval-Augmented Generation (RAG) to ground its responses in a curated vault of Nigerian curriculum-approved materials (Gao et al., 2024). It also employs a conversational AI persona — "Ned" — designed to interact with students in a supportive, emotionally adaptive manner.

---

## 1.2 Statement of the Problem

Despite significant investment in educational technology, a fundamental gap persists: no AI-powered tutoring system currently exists that is comprehensively aligned with Nigeria's multi-tier national education framework, emotionally aware in its interactions, and accessible to learners across the country's diverse infrastructure landscape.

The specific problems that motivated the development of NedAI can be summarized as follows:

1. **Curriculum misalignment:** Available AI tutoring tools are built around foreign curricula and do not reflect the learning objectives or assessment formats prescribed by NERDC, WAEC, NECO, JAMB, NUC, NBTE, or NCCE (Okeke & Mba, 2025).
2. **Factual unreliability:** General-purpose AI models frequently generate incorrect or curriculum-inappropriate responses when used for educational purposes without verification against an approved knowledge source (Alves et al., 2025; Maity & Deroy, 2024).
3. **Absence of emotional adaptability:** Existing tools treat learning as a purely cognitive transaction. They do not account for the anxiety, boredom, or motivational state of the learner, which are critical for sustained engagement (Wang & Xu, 2025).
4. **Pedagogical safety gaps:** Studies have found that even leading AI models can exhibit behaviors in tutoring contexts that are pedagogically harmful — such as providing direct answers that bypass critical thinking, or generating inappropriate content (Mu et al., 2025).
5. **Inequitable access:** The digital divide in Nigeria means that many students cannot rely on consistent internet connectivity (Adebayo et al., 2024). Most existing AI tools have no offline capability, effectively excluding a large portion of the student population.

---

## 1.3 Aim and Objectives of the Study

**Aim**
The aim of this project is to design and develop NedAI — an AI-powered, curriculum-aligned intelligent tutoring system for Nigerian learners across all levels of education, capable of running across web, desktop, and mobile platforms.

**Objectives**
To achieve this aim, the following specific objectives were set:
1. To design a Retrieval-Augmented Generation (RAG) architecture that grounds AI responses in a curated knowledge vault of Nigerian curriculum materials.
2. To develop a conversational AI interface with an emotionally adaptive persona capable of providing encouraging and pedagogically sound responses.
3. To implement a hybrid LLM architecture combining cloud models (Gemini) with offline local models (Llama-3 and Phi-3) to ensure access without internet connectivity.
4. To build a Knowledge Vault management system for administrators and users to upload and manage academic documents.
5. To evaluate the system's usability and accuracy through structured testing.

---

## 1.4 Scope of the Study

NedAI is designed to operate across the full Nigerian education continuum, focusing on the following defined scope:

*   **Educational levels covered:** Early Childhood Care and Development Education (ECCDE), Primary Education, Junior Secondary School (JSS), Senior Secondary School (SSS), and Tertiary Education.
*   **System components:** This study covers the development of the NedAI web application, the NedAI Desktop application (with local offline model inference), the NedAI Mobile application, and the RAG-based backend knowledge retrieval engine.
*   **Geographical scope:** The system is designed for Nigerian learners nationwide but was developed and tested within a Nigerian university environment.
*   **Platform:** NedAI operates across three client interfaces: a web app, an Electron-based desktop app, and a mobile app.

---

## 1.5 Significance of the Study

**For Nigerian students,** the system provides a patient, knowledgeable, always-available academic companion that understands the Nigerian curriculum. A student in Kano preparing for WAEC Mathematics or a postgraduate student in Lagos working through a research methodology question can receive relevant, grounded support.

**For teachers and lecturers,** NedAI handles the repetitive work of answering frequently asked questions and providing practice exercises, freeing educators to focus on the deeper instructional dimensions of their role.

**For educational institutions,** the system offers a cost-effective way to extend academic support beyond classroom hours without expanding teaching staff, making it particularly valuable for public schools operating under resource constraints (Babalola & Bamidele, 2024).

**For Nigeria's education system as a whole,** NedAI represents a proof of concept that AI-powered educational tools can and should be built for local contexts. In a country where mass failure rates in core WAEC subjects remain a challenge (WAEC, 2023), scalable learning support is urgently needed.

---

## 1.6 Limitations of the Study

As with any software development project of this scope, certain constraints shaped the boundaries of what was achievable within the timeframe of this study:

1. **Language Scope:** Nigeria is home to over 500 indigenous languages (Ethnologue, 2023). While many Nigerian students communicate comfortably in English, a significant number—particularly at the ECCDE and primary levels—would benefit from support in Hausa, Yoruba, or Igbo. The current version of NedAI supports English only, which limits its initial accessibility for early-stage learners in rural regions.
2. **Evaluation Scale:** Formal evaluation of the system (UAT) was conducted with a limited user group within a university environment. Broader empirical validation across multiple secondary schools in different geopolitical zones is needed to fully assess the system's long-term effectiveness on WAEC or JAMB performance outcomes (Babalola & Bamidele, 2024).
3. **Infrastructure Assumptions:** While the desktop and mobile applications address offline access through hybrid model routing, the web application still requires a functional internet connection. Furthermore, devices lacking the minimum hardware specifications (e.g., 8GB+ RAM) for local model inference like Llama-3 will default to the less capable Phi-3 Mini, which may result in slightly lower reasoning quality (Shi et al., 2025).

---

## 1.7 Definition of Terms

For clarity and consistency throughout this study, the following technical and operational terms are defined as they apply within the context of the NedAI project:

| Term | Definition |
| :--- | :--- |
| **Artificial Intelligence (AI)** | The simulation of human cognitive processes by computer systems. In this project, it refers to large language models used for educational dialogue. |
| **Intelligent Tutoring System (ITS)** | Software that uses AI to provide personalized instruction and feedback, adapting to individual learner needs. |
| **Large Language Model (LLM)** | An AI model trained on vast text data, capable of generating human language. Examples include Gemini, Llama-3, and Phi-3. |
| **Retrieval-Augmented Generation (RAG)** | An architecture where an AI retrieves relevant information from a specific knowledge base before generating a response, ensuring factual accuracy. |
| **Knowledge Vault** | The structured repository of curriculum-aligned documents (textbooks, past questions) that NedAI uses to ground its answers. |
| **Hallucination** | When an AI model generates responses that are grammatically fluent but factually incorrect or fabricated. |
| **Emotionally Adaptive** | Systems designed to recognize and respond appropriately to the emotional or motivational state of a user. |
| **NERDC** | National Educational Research and Development Council — the body responsible for Nigeria's basic and secondary curricula. |
| **NUC** | National Universities Commission — the regulatory body for Nigerian universities. |
| **Offline Inference** | Running an AI model locally on a user's device (e.g., desktop or mobile) without requiring an internet connection. |
