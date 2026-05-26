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
