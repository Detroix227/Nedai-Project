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
