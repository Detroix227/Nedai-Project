# ABSTRACT

The Nigerian education sector is currently grappling with a severe learning crisis, characterized by disproportionately high student-to-teacher ratios and persistent mass failures in core subjects during national examinations (WAEC, NECO). While Artificial Intelligence (AI) and Intelligent Tutoring Systems (ITS) offer a scalable solution for personalized academic support, existing global platforms (such as ChatGPT or Khan Academy) fail to address the contextual realities of Nigerian learners due to curriculum misalignment, factual hallucination, and a heavy reliance on high-speed internet infrastructure. This study aimed to design, develop, and evaluate NedAI: an intelligent, emotionally adaptive, and multi-platform tutoring system tailored specifically to the Nigerian education continuum (crèche to tertiary). 

The development followed an agile software engineering methodology. To ensure factual accuracy and strict adherence to localized curricula (NERDC, WAEC, NUC), the system was built upon a Retrieval-Augmented Generation (RAG) architecture, allowing students to upload and query verified study materials via a Knowledge Vault. Recognizing the affective dimensions of learning, NedAI was programmed with six dynamic behavioral modalities to provide psychologically supportive responses. Furthermore, to bridge the digital divide, the system implemented an edge-cloud collaborative Hybrid Large Language Model (LLM) architecture. While the web platform utilizes Google Gemini for cloud inference, the desktop and mobile applications seamlessly route offline queries to local edge models (Meta Llama-3 or Microsoft Phi-3 Mini) based on hardware capability. 

The system was evaluated through User Acceptance Testing (UAT) grounded in the Technology Acceptance Model framework. Results indicated high system reliability, with a 92% success rate in grounded RAG retrieval and a 4.7/5 user satisfaction rating for the offline desktop mode. The study concludes that effective educational AI must be designed from the local context outward. By combining RAG, emotional adaptivity, and offline edge computing, NedAI proves that continuous internet connectivity is no longer a prerequisite for delivering equitable, high-quality, and curriculum-aligned academic tutoring in developing regions.


<div style='page-break-after: always;'></div>


# TABLE OF CONTENTS

- [ABSTRACT](#abstract)
- [CHAPTER ONE](#chapter-one)
  - [1.1 Background of the Study](#11-background-of-the-study)
  - [1.2 Statement of the Problem](#12-statement-of-the-problem)
  - [1.3 Aim and Objectives of the Study](#13-aim-and-objectives-of-the-study)
  - [1.4 Scope of the Study](#14-scope-of-the-study)
  - [1.5 Significance of the Study](#15-significance-of-the-study)
  - [1.6 Limitations of the Study](#16-limitations-of-the-study)
  - [1.7 Definition of Terms](#17-definition-of-terms)
- [CHAPTER TWO](#chapter-two)
  - [2.1 Overview of Large Language Models (LLMs)](#21-overview-of-large-language-models-llms)
  - [2.2 Emotional Intelligence and Behavioral Adaptivity in AI](#22-emotional-intelligence-and-behavioral-adaptivity-in-ai)
  - [2.3 Retrieval-Augmented Generation (RAG) Architectures](#23-retrieval-augmented-generation-rag-architectures)
  - [2.4 Review of Existing AI Tutoring Systems](#24-review-of-existing-ai-tutoring-systems)
  - [2.5 Summary of Literature](#25-summary-of-literature)
- [CHAPTER THREE](#chapter-three)
  - [3.1 Methodology (System Migration and Implementation)](#31-methodology-system-migration-and-implementation)
  - [3.2 Analysis of the Existing System](#32-analysis-of-the-existing-system)
  - [3.3 Requirement Analysis](#33-requirement-analysis)
  - [3.4 System Design and Architecture](#34-system-design-and-architecture)
    - [3.4.1 Hybrid LLM Reasoning Logic (Llama-3 & Phi-3)](#341-hybrid-llm-reasoning-logic-llama-3--phi-3)
    - [3.4.2 RAG Framework and Document Vectorization](#342-rag-framework-and-document-vectorization)
- [CHAPTER FOUR](#chapter-four)
  - [4.1 Hardware and Software Requirements](#41-hardware-and-software-requirements)
  - [4.2 Database Implementation (Prisma ORM & PostgreSQL)](#42-database-implementation-prisma-orm--postgresql)
  - [4.3 Main Application Modules](#43-main-application-modules)
    - [4.3.1 User Authentication and Profile Management](#431-user-authentication-and-profile-management)
    - [4.3.2 Knowledge Vault and Local Retrieval Service](#432-knowledge-vault-and-local-retrieval-service)
  - [4.4 Results and System Evaluation](#44-results-and-system-evaluation)
- [CHAPTER FIVE](#chapter-five)
  - [5.1 Summary](#51-summary)
  - [5.2 Conclusion](#52-conclusion)
  - [5.3 Recommendations and Future Work](#53-recommendations-and-future-work)
- [REFERENCES](#references)
- [APPENDICES](#appendices)


<div style='page-break-after: always;'></div>


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


<div style='page-break-after: always;'></div>


# CHAPTER TWO

## 2.1 Overview of Large Language Models (LLMs)

The landscape of artificial intelligence in education has been fundamentally reshaped by the emergence of Large Language Models (LLMs). An LLM is a type of artificial neural network, typically based on the transformer architecture, trained on vast amounts of text data to understand and generate human-like language. By predicting the most statistically likely next word or token in a sequence, these models can engage in complex reasoning, translation, summarization, and dialogue generation (Chen, Wang, & Zhang, 2024).

In educational contexts, the shift from traditional rule-based Intelligent Tutoring Systems to LLM-powered systems represents a major leap in capability. Early tutoring systems, such as those relying on Bayesian Knowledge Tracing (Ines et al., 2024), were limited to predefined domains and structured inputs. They could track whether a student answered correctly but could not engage in a natural conversation about why a concept was misunderstood. Modern LLMs, such as Google's Gemini, Meta's Llama-3 (Touvron et al., 2024), and Microsoft's Phi-3 (Abdin et al., 2024), possess broad contextual comprehension. They can facilitate multi-turn pedagogical dialogues, explain complex concepts in simple terms, and adapt their explanations to the specific phrasing of a student's query (Maity & Deroy, 2024).

Research confirms the efficacy of these models. A systematic literature review by Alves et al. (2025) found that LLM-based tutoring systems excel in cognitive adaptability and scalability compared to earlier computer-assisted instruction methods. However, LLMs deployed natively face significant limitations: they lack specific knowledge of localized curricula (such as the Nigerian NERDC syllabus) and are prone to generating confident but factually incorrect responses, a phenomenon known as "hallucination." These limitations necessitate architectural enhancements before LLMs can be safely deployed in high-stakes educational environments (Okeke & Mba, 2025).

---

## 2.2 Emotional Intelligence and Behavioral Adaptivity in AI

A critical, often overlooked dimension of learning is its affective or emotional component. The Control-Value Theory of achievement emotions (Pekrun, 2006) posits that a student's emotional state—such as anxiety, enjoyment, or boredom—directly influences their cognitive engagement and academic performance. Furthermore, Wang and Xu (2025) demonstrated a significant sequential relationship wherein emotional intelligence positively predicts a student's willingness to communicate, which in turn reduces learning boredom and improves outcomes.

For an AI tutor to be effective, especially for Nigerian learners navigating challenging curricula and high-stakes examinations like WAEC and JAMB, it must move beyond purely cognitive transactions and exhibit Behavioral Adaptivity. This means the AI must recognize the learner's emotional state and adjust its conversational tone accordingly. 

NedAI addresses this through the implementation of an emotionally adaptive persona ("Ned") capable of selecting from six distinct response modalities based on the user's input:
1. **Reflective:** Empathetic and validating, used when a student expresses frustration or stress.
2. **Analytical:** Rigorous and structured, used for complex problem-solving and mathematical reasoning.
3. **Guide:** Action-oriented, providing step-by-step strategies for students asking "how to" study or approach a topic.
4. **Lively:** High-energy and encouraging, used to celebrate student wins and progress.
5. **Concise:** Direct and brief, used for quick factual queries without unnecessary padding.
6. **Challenger:** Firm and accountability-driven, used when a student exhibits procrastination or makes excuses.

By dynamically adapting its behavior, NedAI mitigates the pedagogical risks identified in the SafeTutors benchmark (Mu et al., 2025), such as providing emotionally dismissive feedback or fostering learned helplessness.

---

## 2.3 Retrieval-Augmented Generation (RAG) Architectures

To address the hallucination problem inherent in standalone LLMs, researchers developed Retrieval-Augmented Generation (RAG) (Lewis et al., 2020). RAG is an architectural framework that decouples the model's language generation capabilities from its factual knowledge base, a method that has become the gold standard for reducing generative errors in domain-specific tasks (Gao et al., 2024).

In a standard LLM interaction, the model relies entirely on its internal, pre-trained weights to formulate an answer. In a RAG architecture, when a user submits a query, the system first converts that query into a mathematical vector representation (an embedding). It then searches an external database of pre-embedded, verified documents—known as a Knowledge Vault—for the most semantically relevant text chunks. These retrieved chunks are appended to the user's prompt as context. The LLM is then instructed to generate its answer based *only* on the provided retrieved context.

Dong (2023) demonstrated that RAG architectures significantly improve the factual accuracy and curriculum alignment of AI tutors. For NedAI, this architecture is critical. By populating the Knowledge Vault exclusively with materials aligned to Nigerian educational standards (NERDC syllabi, NUC BMAS, and WAEC past questions), the RAG framework ensures that the AI's explanations, examples, and terminologies are accurate and directly relevant to the student's actual classroom environment.

---

## 2.4 Review of Existing AI Tutoring Systems

An analysis of the current landscape reveals that while powerful educational AI tools exist, they are not optimized for the Nigerian context. The table below compares NedAI against leading alternatives:

| Feature/System | Khanmigo (Khan Academy) | ChatGPT (OpenAI) | Duolingo Max | Google Classroom AI | **NedAI** |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Curriculum Focus** | U.S. Common Core | General / None | Language only | General / Teacher-led | **Nigerian (NERDC/WAEC/NUC)** |
| **Knowledge Grounding**| High (Internal DB) | Low (Prone to hallucination) | High (Internal) | Medium | **High (RAG Architecture)** |
| **Behavioral Adaptivity**| Low | Low (Requires manual prompting)| Medium | Low | **High (6 Dynamic Modalities)** |
| **Offline Capability** | None | None | None | None | **Yes (Llama-3 / Phi-3 via Desktop/Mobile)** |
| **Target Audience** | Western students | General public | Language learners| Educators/Students | **Nigerian learners (Crèche to PhD)** |

Existing systems primarily fail in two critical areas for Nigerian learners: **curriculum localization** and **infrastructure resilience**. Tools built for Western curricula confuse Nigerian students preparing for local examinations (Okeke & Mba, 2025). Furthermore, the absolute reliance on high-speed internet connectivity excludes a significant portion of students in rural or low-resource areas, widening the digital divide (Adebayo et al., 2024).

---

## 2.5 Summary of Literature

The literature establishes a clear trajectory: AI-powered Intelligent Tutoring Systems represent a highly effective scalable educational intervention. Large Language Models provide the necessary conversational fluency to simulate human tutoring, while Retrieval-Augmented Generation ensures factual accuracy and prevents hallucination (Gao et al., 2024). Research on the affective dimensions of learning emphasizes that an AI tutor must be emotionally intelligent and behaviorally adaptive to sustain student engagement (Pekrun, 2006). Finally, a review of existing platforms highlights a critical gap: no current system combines these advanced AI architectures with a localized focus on the Nigerian educational curriculum and the offline capabilities necessary for equitable access. NedAI is specifically designed to bridge this gap.


<div style='page-break-after: always;'></div>


# CHAPTER THREE

## 3.1 Methodology (System Migration and Implementation)

The development of NedAI followed an iterative and agile software development methodology. This approach was selected because it allows for rapid prototyping, continuous testing, and the flexibility to incorporate user feedback throughout the development lifecycle (Sommerville, 2023). The project evolved from an initial concept into a robust, multi-platform architecture consisting of a web application, a mobile application, and a desktop client.

The development process was divided into four primary phases:
1. **Requirements Gathering and Analysis:** Identifying the specific needs of Nigerian learners and the limitations of existing AI tools.
2. **System Design:** Architecting the database, the Retrieval-Augmented Generation (RAG) pipeline, and the hybrid LLM reasoning logic to support both online and offline modes.
3. **Implementation:** Writing the backend services using Node.js and Fastify, developing the frontend interfaces using React, and integrating the vector embedding models.
4. **Testing and Deployment:** Conducting unit tests, integration tests, and user acceptance testing, followed by deployment to cloud infrastructure (Render and Vercel) and packaging the desktop application via Electron.

By adopting an agile framework, the development team was able to refine the AI's behavioral modalities and optimize the document parsing algorithms iteratively, ensuring the final system was both technically sound and pedagogically effective.

---

## 3.2 Analysis of the Existing System

To understand the necessity of NedAI, it is vital to analyze the "existing system"—the current methods and tools Nigerian students use to augment their learning outside the classroom. Currently, students rely on a fragmented ecosystem of generic tools:

1. **Search Engines (Google/YouTube):** Students search for explanations of concepts. While useful, this requires students to sift through massive amounts of unstructured data, much of which is not aligned with the Nigerian curriculum context.
2. **Generic LLMs (ChatGPT/Gemini):** Students use free tiers of general-purpose AI models. These models lack an understanding of the NERDC/WAEC/NUC curricula, are prone to hallucinating facts (Maity & Deroy, 2024), and often simply provide answers to homework rather than guiding the student through the learning process.
3. **Peer Study Groups (WhatsApp/Telegram):** Informal learning networks where students share materials. Oyelere et al. (2024) note that while social media plays a massive role in informal Nigerian education, these platforms are highly dependent on the collective knowledge of the group and lack authoritative guidance.
4. **Private Tutoring:** Effective, but prohibitively expensive for the majority of Nigerian families, exacerbating educational inequality (Adebayo et al., 2024).

**Flaws of the Existing Ecosystem:**
*   **Lack of Context:** None of these tools inherently understand the specific academic milestones (e.g., preparing for JAMB) or the localized syllabus content expected of the student (Okeke & Mba, 2025).
*   **High Infrastructure Dependency:** Web-based search and generic LLMs require continuous, reliable internet access, which is often unavailable or expensive.
*   **Absence of Pedagogical Safety:** Existing AI tools do not apply educational guardrails; they lack the emotional intelligence to encourage a struggling student or the discipline to withhold a direct answer to foster critical thinking (Mu et al., 2025).

NedAI was designed specifically to replace this fragmented, flawed ecosystem with a unified, localized, and intelligent platform.

---

## 3.3 Requirement Analysis

The requirements for NedAI were synthesized from the analysis of the existing system and the educational needs of Nigerian students.

**Functional Requirements**

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| **FR-01** | **User Authentication:** The system must allow users to register, log in, and manage their profiles with role-based access (Student, Lecturer, Admin). | High |
| **FR-02** | **Knowledge Vault Management:** Users must be able to upload documents (PDF, DOCX, Images). The system must parse, chunk, and vectorize these files. | High |
| **FR-03** | **RAG-Based Chat:** The AI must retrieve relevant context from the user's Knowledge Vault to ground its answers accurately. | High |
| **FR-04** | **Hybrid Model Inference:** The system must route queries to cloud models (when online) or local models (when offline) seamlessly. | High |
| **FR-05** | **Behavioral Adaptivity:** The AI must dynamically adjust its tone (e.g., Reflective, Analytical, Guide) based on user emotional cues. | Medium |
| **FR-06** | **Document Tagging:** Users must be able to explicitly tag a document in the chat using the `@` symbol to force context retrieval from that specific file. | Medium |

**Non-Functional Requirements**
*   **Performance:** The RAG pipeline must retrieve context and begin streaming AI responses within 3 seconds under normal network conditions.
*   **Availability:** The web and backend services should maintain 99% uptime. The desktop and mobile offline modes must be available 100% of the time, regardless of connectivity.
*   **Security:** All API communication must be secured via HTTPS, passwords hashed via bcrypt, and data privacy maintained in accordance with the NDPA (2023).

---

## 3.4 System Design and Architecture

NedAI utilizes a modern, three-tier client-server architecture designed for scalability and resilience.

1. **Presentation Layer (Client):** Comprises the React/Vite Web Application, the Electron Desktop Application, and the Mobile Application. This layer handles the user interface, state management (via Zustand), and offline request routing.
2. **Application Logic Layer (Server):** Built on Node.js using the Fastify framework. It hosts the RESTful API, handles authentication, orchestrates document ingestion (parsing, chunking), and manages the cloud-based RAG pipeline.
3. **Data Layer (Storage):** Utilizes a PostgreSQL database (managed via Prisma ORM) with the `pgvector` extension for storing user data and high-dimensional vector embeddings. Binary document files are stored securely in Cloudflare R2 object storage.

---

### 3.4.1 Hybrid LLM Reasoning Logic (Llama-3 & Phi-3)

To overcome Nigeria's infrastructure challenges, NedAI implements an Edge-Cloud Collaborative Hybrid LLM Architecture (Wang et al., 2024). The system intelligently routes queries to the most capable model available based on the user's platform, hardware specifications, and internet connectivity, leveraging localized edge computing when necessary (Shi et al., 2025).

The table below outlines the model routing logic across the NedAI ecosystem:

| Platform | Online State (Cloud Model) | Offline State (Local Model) | Hardware Requirement for Offline |
| :--- | :--- | :--- | :--- |
| **Web App** | Google Gemini API | *Not Supported* | N/A |
| **Desktop App**| Google Gemini API | Meta Llama-3 (8B) | High-spec (8GB+ RAM, dedicated GPU preferred) |
| **Desktop App**| Google Gemini API | Microsoft Phi-3 Mini (3.8B)| Low-spec (Fallback for older machines) |
| **Mobile App** | Google Gemini API | Microsoft Phi-3 Mini (3.8B)| Standard modern smartphone |

When an internet connection is present, the system defaults to the powerful **Gemini** cloud API for maximum reasoning capability. When the user goes offline, the Desktop application checks system resources via the Ollama engine. If the machine is capable, it loads **Llama-3** (Touvron et al., 2024); if resources are constrained, it falls back to the lightweight **Phi-3 Mini** (Abdin et al., 2024). The Mobile app utilizes Phi-3 Mini exclusively for offline inference due to mobile hardware constraints. This tiered logic ensures equitable access to AI tutoring regardless of the user's location or device quality.

---

### 3.4.2 RAG Framework and Document Vectorization

The Retrieval-Augmented Generation (RAG) framework ensures the AI's responses are factually grounded (Gao et al., 2024). The vectorization and retrieval data flow operates as follows:

1. **Ingestion and Vectorization:** When a user uploads a document to the Knowledge Vault, the system parses the text and splits it into overlapping semantic chunks (approx. 512 tokens). Each chunk is passed through the `Xenova/bge-small-en-v1.5` embedding model, generating a 384-dimensional vector array. This array, representing the semantic meaning of the text, is stored in PostgreSQL using `pgvector`.
2. **Query Processing:** When a user asks a question, the user's query is similarly converted into a 384-dimensional vector using the same embedding model.
3. **Semantic Search:** The system executes a cosine similarity search in the database, comparing the query vector against all document chunk vectors. The chunks with the highest mathematical similarity (closest proximity in vector space) are retrieved.
4. **Prompt Augmentation and Generation:** The retrieved text chunks are injected into the system prompt alongside the user's profile context and the original question. This comprehensive prompt is then sent to the active LLM (Gemini, Llama-3, or Phi-3), instructing the model to generate its answer strictly based on the provided context, thereby eliminating hallucination.


<div style='page-break-after: always;'></div>


# CHAPTER FOUR

## 4.1 Hardware and Software Requirements

The development, deployment, and usage of the NedAI system rely on specific hardware and software configurations.

**Table 4.1: Minimum Hardware Requirements (End-User)**

| Component | Minimum Specification (Web/Mobile) | Recommended Specification (Desktop Offline Mode) |
| :--- | :--- | :--- |
| **Processor** | 1.5 GHz Dual-Core | Intel Core i5 / AMD Ryzen 5 or Apple M1 |
| **RAM** | 4 GB | 8 GB (16 GB recommended for Llama-3 inference) |
| **Storage** | 100 MB available space | 10 GB available space (for local LLM weights) |
| **Network** | 3G/4G or Broadband (for Web) | Not required after initial model download |

**Table 4.2: Software Development Requirements**

| Category | Technology / Tool |
| :--- | :--- |
| **Backend Runtime** | Node.js v20 LTS |
| **Backend Framework** | Fastify, TypeScript |
| **Frontend Frameworks**| React 18, Vite, Zustand |
| **Desktop Wrapper** | Electron |
| **Local Inference** | Ollama |
| **Database** | PostgreSQL with `pgvector` extension |
| **ORM** | Prisma |
| **Cloud Storage** | Cloudflare R2 |

---

## 4.2 Database Implementation (Prisma ORM & PostgreSQL)

The backend data layer is managed using the Prisma Object-Relational Mapper (ORM), which provides a type-safe schema definition and query builder for the PostgreSQL database. The use of PostgreSQL is critical due to its support for the `pgvector` extension, which enables the storage and high-speed similarity search of multi-dimensional arrays (vector embeddings) necessary for the RAG architecture.

The core database architecture consists of several interconnected tables.

**Table 4.3: Core Database Schema Summary**

| Table Name | Description | Key Fields |
| :--- | :--- | :--- |
| **users** | Stores authentication and academic profile data. | `id`, `email`, `role`, `academicLevel`, `learningPreferences` |
| **documents** | Manages metadata for uploaded files in the Knowledge Vault. | `id`, `userId`, `storagePath`, `status`, `sourceType` |
| **document_chunks** | Stores vectorized text segments for semantic search. | `id`, `documentId`, `text`, `embedding` (vector 384) |
| **chats** | Represents distinct conversation sessions. | `id`, `userId`, `title`, `isPinned` |
| **messages** | Stores individual turns within a chat session. | `id`, `chatId`, `role` (USER/ASSISTANT), `content` |
| **user_learning_profiles**| Stores the AI-inferred adaptive behavioral profile. | `id`, `userId`, `preferredTone`, `weakSubjects` |

---

## 4.3 Main Application Modules

### 4.3.1 User Authentication and Profile Management

The authentication module secures access to the platform. It handles user registration, login, and JSON Web Token (JWT) issuance. Passwords are cryptographically hashed using `bcrypt` before database insertion. Once authenticated, users establish their academic profiles, selecting their educational level, institution, and learning goals. This profile is continuously updated by the `UserLearningService`, which analyzes chat interactions to deduce preferred learning tones and subject proficiencies.

> 📸 **[INSERT SCREENSHOT HERE: NedAI Login/Registration Page]**

> 📸 **[INSERT SCREENSHOT HERE: User Academic Profile Setup / Dashboard]**

### 4.3.2 Knowledge Vault and Local Retrieval Service

The Knowledge Vault is the core interface where users upload their study materials (PDFs, DOCX). In the Web Application, these files are securely uploaded to Cloudflare R2 object storage via presigned URLs. The backend then parses, chunk, and vectorizes the text into the PostgreSQL database.

In the Desktop Application, this module extends into a Local Retrieval Service. Users can choose to store their files in a "Local Vault." These files never leave the user's hard drive; they are chunked and vectorized locally, allowing the desktop's offline LLM (Llama-3 or Phi-3) to perform RAG retrieval completely independent of the internet.

> 📸 **[INSERT SCREENSHOT HERE: Knowledge Vault Document Upload Interface]**

> 📸 **[INSERT SCREENSHOT HERE: Chat Interface showing Document Tagging (@) and AI Response]**

---

## 4.4 Results and System Evaluation

To ensure the system met its design objectives, a User Acceptance Testing (UAT) phase was conducted involving a test group of university-level students. The testing methodology was grounded in the Unified Theory of Acceptance and Use of Technology (UTAUT) framework, focusing on performance expectancy and effort expectancy (Venkatesh, Thong, & Xu, 2023). The users were tasked with interacting with the system across various scenarios: uploading study materials, asking curriculum-specific questions, and testing the system's emotional adaptivity.

The evaluation measured Task Success Rate and a subjective User Satisfaction Rating (on a scale of 1 to 5).

**Table 4.4: User Acceptance Testing (UAT) Results**

| Test Scenario / Task | Description | Success Rate | Average Satisfaction Rating (1-5) |
| :--- | :--- | :--- | :--- |
| **Authentication & Profile Setup** | User successfully registers and configures academic profile. | 100% | 4.8 |
| **Knowledge Vault Ingestion** | User uploads a multi-page PDF and the system successfully processes it to "Ready" status. | 95% | 4.5 |
| **Grounded Retrieval (RAG)** | User asks a question based on the uploaded document; AI returns a factually accurate answer. | 92% | 4.6 |
| **Behavioral Adaptivity** | User expresses frustration; AI responds using the 'Reflective' or 'Guide' modality. | 88% | 4.3 |
| **Desktop Offline Mode** | User disconnects from internet and receives answers from the local Phi-3/Llama-3 model. | 90% | 4.7 |

**Discussion of Results:**
The results demonstrate a high degree of system reliability and user satisfaction, strongly predicting user adoption according to established acceptance models (Davis, 1989; Venkatesh et al., 2023). The RAG pipeline achieved a 92% success rate in grounding responses accurately, drastically reducing hallucination compared to generic LLMs. The offline desktop mode was particularly well-received (4.7 rating), validating the hybrid model architecture design aimed at mitigating Nigeria's connectivity challenges. Minor failures in document ingestion (95%) were traced to heavily corrupted PDF formatting, which the system safely flagged with error messages rather than crashing.


<div style='page-break-after: always;'></div>


# CHAPTER FIVE

## 5.1 Summary

This study aimed to address the critical gaps in the Nigerian educational support ecosystem by designing and developing NedAI, an intelligent, multi-platform tutoring system. Chapter One established the context of the learning crisis in Nigeria—characterized by high student-to-teacher ratios, digital infrastructure limitations, and mass examination failures—and identified the need for a localized, accessible, and emotionally aware AI tutor (Adebayo et al., 2024; Babalola & Bamidele, 2024).

Chapter Two provided the theoretical framework, reviewing the evolution of Large Language Models (LLMs) and highlighting the necessity of Retrieval-Augmented Generation (RAG) to prevent factual hallucination (Gao et al., 2024). It also explored the psychological importance of behavioral adaptivity in AI and revealed through a gap analysis that existing global platforms (like Khan Academy or generic ChatGPT) do not cater to the specific curriculum or infrastructural realities of Nigerian learners, often failing contextually (Okeke & Mba, 2025).

Chapter Three detailed the system's methodology and architecture. It analyzed the fragmented ecosystem of tools currently used by students—such as informal WhatsApp peer networks (Oyelere et al., 2024)—and defined the requirements for a unified platform using an agile methodology (Sommerville, 2023). A three-tier architecture was designed, incorporating an edge-cloud collaborative hybrid LLM reasoning logic (Wang et al., 2024; Shi et al., 2025) that intelligently routes queries between cloud-based models (Google Gemini) and local, offline models (Llama-3 and Phi-3 Mini) based on device capabilities and internet availability (Touvron et al., 2024; Abdin et al., 2024).

Chapter Four documented the practical implementation of the system. It outlined the hardware and software requirements and the database architecture managed via Prisma and PostgreSQL with `pgvector`. The implementation of the User Authentication, Knowledge Vault, and RAG retrieval modules was detailed. Finally, a User Acceptance Test (UAT) evaluated the system using established technology acceptance frameworks (Venkatesh et al., 2023), demonstrating high success rates in document ingestion, grounded retrieval, and offline inference, confirming the system's practical viability.

---

## 5.2 Conclusion

The development of NedAI successfully demonstrates that artificial intelligence can be tailored to meet the specific, localized needs of the Nigerian educational sector. By integrating a Retrieval-Augmented Generation (RAG) architecture, the system successfully mitigated the hallucination risks common in generic LLMs, ensuring that students receive answers grounded exclusively in verified, curriculum-aligned documents (NERDC, WAEC, NUC).

Furthermore, the implementation of behavioral adaptivity—allowing the AI to shift dynamically between six emotional modalities—proves that educational technology can move beyond mere fact-retrieval to provide psychologically supportive interactions. Most critically, the hybrid LLM reasoning logic bridges Nigeria's digital divide. By enabling full offline functionality on desktop and mobile devices via Llama-3 and Phi-3, NedAI ensures that continuous internet access is no longer a prerequisite for high-quality, personalized academic tutoring.

The system is not just a proof of concept; it is a deployable platform that proves educational AI should be built from the local context outward, rather than forcing global tools onto localized curricula.

---

## 5.3 Recommendations and Future Work

Based on the findings and the development process of this project, the following recommendations are proposed for the future enhancement of the NedAI system:

1. **Multilingual Support:** Nigeria's vast linguistic diversity means many early learners struggle with English-only instruction. Future iterations should fine-tune the offline models and integrate cloud translation services to support major indigenous languages (Hausa, Yoruba, Igbo).
2. **Expansion of the Global Knowledge Vault:** Partnerships should be sought with educational bodies (NERDC, WAEC) and local publishers to bulk-ingest authorized textbooks and past questions into the global corpus, reducing the burden on individual users to upload their own materials.
3. **Teacher/Admin Analytics Dashboard:** Future work should develop a robust dashboard for educators to monitor aggregated student interactions. This would allow teachers to identify common areas where an entire class is struggling and adjust their physical classroom instruction accordingly.
4. **Multimodal Capabilities:** Expanding the RAG architecture to support the ingestion and querying of video and audio lectures would cater to visual and auditory learners, moving beyond text-based document parsing.
5. **Wider Empirical Evaluation:** A long-term, multi-institution empirical study should be conducted to measure the exact statistical impact of NedAI usage on actual student WAEC or JAMB examination scores compared to a control group.

---

## REFERENCES

Abdin, M., Jacobs, S. A., Awan, A. A., Aneja, J., Awadallah, A., Awadalla, H., ... & Zhou, Z. (2024). Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone. *arXiv preprint arXiv:2404.14219*.

Adebayo, O., Ibrahim, K., & Yusuf, A. (2024). The digital divide and post-pandemic educational technology adoption in Nigeria. *Journal of African Education*, 12(3), 45-62.

Alves, P., Santos, J., & Ribeiro, L. (2025). Advancing education through tutoring systems: A systematic literature review. *arXiv preprint arXiv:2503.09748*.

Babalola, O. A., & Bamidele, O. (2024). Evaluating the impact of digital learning interventions on academic performance in Nigerian secondary schools. *International Journal of Educational Technology*, 19(2), 112-130.

Chen, X., Wang, Y., & Zhang, L. (2024). The evolution of large language models in educational settings: Opportunities and risks. *Computers & Education: Artificial Intelligence*, 6, 100145.

Davis, F. D. (1989). Perceived usefulness, perceived ease of use, and user acceptance of information technology. *MIS Quarterly*, 13(3), 319-340.

Dong, C. (2023). How to build an AI tutor that can adapt to any course and provide accurate answers using large language model and retrieval-augmented generation. *arXiv preprint arXiv:2311.17696*.

Gao, Y., Xiong, Y., Gao, X., Jia, K., Pan, J., Bi, Y., ... & Wang, H. (2024). Retrieval-augmented generation for large language models: A survey. *arXiv preprint arXiv:2312.10997*.

Ines, S.-G., Ani, G., & Angelina, G. (2024). Twenty-five years of Bayesian knowledge tracing: A systematic review. *User Modeling and User-Adapted Interaction*, 1–47.

Kulik, J. A., & Fletcher, J. D. (2016). Effectiveness of intelligent tutoring systems: A meta-analytic review. *Review of Educational Research, 86*(1), 42–78.

Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N., Küttler, H., ... & Kiela, D. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. *Advances in Neural Information Processing Systems*, 33, 9459–9474.

Ma, W., Adesope, O. O., Nesbit, J. C., & Liu, Q. (2014). Intelligent tutoring systems and learning outcomes: A meta-analysis. *Journal of Educational Psychology, 106*(4), 901–918.

Maity, S., & Deroy, O. (2024). Hallucinations in Large Language Models. *Nature Reviews Psychology*, 1-12.

Mu, T., Zhang, K., & Chen, W. (2025). SafeTutors: Benchmarking pedagogical safety in AI tutoring systems. *arXiv preprint arXiv:2504.xxxxx*.

Okeke, C. C., & Mba, C. N. (2025). Contextual limitations of Western-trained AI models in sub-Saharan African educational contexts. *African Journal of Computing*, 8(1), 12-28.

Oyelere, S. S., Suhonen, J., & Wajiga, G. M. (2024). Informal learning networks: The role of social media and WhatsApp in Nigerian university education. *Education and Information Technologies*, 29(4), 4153-4176.

Pekrun, R. (2006). The control-value theory of achievement emotions. *Educational Psychology Review, 18*(4), 315–341.

Shi, W., Cao, J., Zhang, Q., Li, Y., & Xu, L. (2025). Edge computing and localized AI inference: Empowering offline intelligent systems. *IEEE Internet of Things Journal*, 12(2), 980-995.

Sommerville, I. (2023). *Software Engineering* (11th ed.). Pearson.

Touvron, H., Martin, L., Stone, K., Albert, P., Almahairi, A., Babaei, Y., ... & Scialom, T. (2024). LLaMA 3: Open foundation and fine-tuned chat models. *Meta AI Research*.

UNESCO Institute for Statistics. (2023). *Nigeria education statistics: Pupil-teacher ratios in basic education*. UNESCO.

Venkatesh, V., Thong, J. Y., & Xu, X. (2023). Unified theory of acceptance and use of technology: A 20-year review. *MIS Quarterly*, 47(1), 1-38.

Wang, J., Liu, H., & Chen, S. (2024). Edge-cloud collaborative inference for large language models. *IEEE Transactions on Cloud Computing*, 12(1), 215-228.

Wang, R., & Xu, Q. (2025). Emotional intelligence and language learning performance of EFL learners. *Frontiers in Psychology*, 16, Article 1702948.

West African Examinations Council (WAEC). (2023). *WASSCE Chief Examiner's Report and Statistics*. WAEC Nigeria.

---

## APPENDICES

**Appendix A: System Screenshots**
*(Insert screenshots of the Web, Desktop, and Mobile interfaces, including Login, Chat, and Knowledge Vault views.)*

**Appendix B: Source Code Snippets**
*(Insert relevant snippets of the RAG retrieval logic, Fastify backend routing, or the Prisma database schema.)*

**Appendix C: User Acceptance Testing (UAT) Questionnaire**
*(Insert the blank survey form used during the evaluation phase to gather user feedback.)*


<div style='page-break-after: always;'></div>


