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
