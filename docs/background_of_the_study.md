# Chapter 2: Background of the Study

## 2.1 Introduction

The global landscape of education is undergoing a profound transformation, driven by the convergence of artificial intelligence (AI), large language models (LLMs), and interactive digital platforms. At the center of this transformation is the re-emergence of Intelligent Tutoring Systems (ITS)—software-based systems leveraging AI to deliver adaptive, personalized instruction in real time (Mousavinasab et al., 2021; Kulik & Fletcher, 2016). However, despite decades of progress in ITS research, a persistent and largely unaddressed gap remains: the failure of most existing systems to simultaneously account for *local curriculum alignment*, *emotional safety*, and *linguistically appropriate interaction* for learners in non-Western educational contexts.

This background of the study contextualizes the development of **NedAI**—a web-based intelligent tutoring system designed to serve learners across the **entire Nigerian education continuum**, from Early Childhood Care and Development Education (ECCDE) at crèche and nursery level, through primary and secondary school, up to undergraduate, postgraduate, and doctoral (PhD) study at Nigerian universities and polytechnics. NedAI aligns with the regulatory frameworks of all relevant national bodies: the National Educational Research and Development Council (NERDC) and the Federal Ministry of Education (FMoE) for pre-tertiary education; the National Universities Commission (NUC) for university education; the National Board for Technical Education (NBTE) for polytechnics and technical colleges; and the National Commission for Colleges of Education (NCCE) for teacher education institutions. NedAI is grounded in four converging research domains: (1) the evolution and effectiveness of Intelligent Tutoring Systems, (2) knowledge retrieval architectures for AI-powered tutors, (3) emotional intelligence and safety in AI–learner interactions, and (4) the policy and regulatory landscape governing AI-assisted learning across all sectors of the Nigerian education system.

---

## 2.2 Evolution and Effectiveness of Intelligent Tutoring Systems

### 2.2.1 From CAI to LLM-Powered Tutors

The history of intelligent tutoring stretches from rudimentary Computer Assisted Instruction (CAI) programs in the 1970s to today's sophisticated AI-driven platforms. Early systems such as SCHOLAR (1970) and LISP Tutor (1983) relied on hard-coded domain knowledge and rule-based expert systems, offering minimal adaptability to individual learner needs (Shute & Psotka, 1994, as cited in Alves et al., 2025). The introduction of Bayesian Knowledge Tracing (BKT) in the 1990s represented a major milestone, allowing systems to probabilistically model a student's knowledge state and adapt instructional difficulty in real time (Ines et al., 2024).

The most recent and significant leap came with the integration of Large Language Models (LLMs) into ITS architectures. Modern LLM-based tutors leverage the generative and contextual comprehension capabilities of transformer models to facilitate natural language interactions, provide explanatory feedback, and support multi-turn pedagogical dialogues (Maity & Deroy, 2024). A 2023 review by Lin et al. found that AI-enhanced ITS can achieve learning gains comparable to or exceeding one-on-one human tutoring under certain conditions—a finding consistent with Bloom's "2-sigma problem" (Bloom, 1984, as cited in Lin et al., 2023). These systems are now recognized as among the most impactful educational technologies available, particularly for bridging learning gaps in underserved or resource-constrained settings.

### 2.2.2 Systematic Evidence for ITS Effectiveness

A systematic literature review analyzing 86 representative studies (Alves et al., 2025) identified three distinct classes of tutoring systems through Latent Class Analysis: (1) **computer-based ITS** relying on text interfaces and AI models such as BKT and LLMs for cognitive engagement, (2) **verbal tutoring systems** emphasizing robot-based social interaction, and (3) **multimodal tutoring systems** integrating verbal, visual, and physical modalities. The review confirms that software-based ITS excel in cognitive adaptability and scalability, leveraging AI algorithms to dynamically adjust task difficulty, provide real-time feedback, and track student progress across sessions (Alves et al., 2025).

A meta-analysis by Ma et al. (2014) covering 107 studies found that ITS consistently produced significant positive effects on student achievement (effect size d = 0.66), while a separate meta-analysis by Kulik and Fletcher (2016) similarly concluded that ITS outperforms conventional classroom instruction across multiple subject areas. These findings establish a compelling empirical foundation for AI-driven tutoring, particularly in contexts where teacher-to-student ratios are high—a well-documented structural challenge within Nigeria's public basic and secondary education system, where primary schools recorded an average pupil-to-teacher ratio of 36:1 in 2022 (UNESCO Institute for Statistics, 2023).

### 2.2.3 Adaptive Learning and Personalization

A defining capability of modern ITS is real-time adaptation—the ability to modify instructional strategies based on a student's evolving performance, preferences, and learning pace. Early adaptation relied on static student models and predefined branching logic. Current systems, by contrast, employ LLM-based "tutor models" and "feedback models" that can dynamically generate explanations, adjust question difficulty, and provide context-sensitive scaffolding based on multi-turn conversation history (Banjade et al., 2024).

Swargiary (2024) emphasizes that AI-driven personalization has demonstrated measurable improvements in both student engagement and academic achievement, though the author cautions that the risk of exacerbating educational inequalities is significant if access to these technologies is unevenly distributed. This concern is acutely relevant to NedAI's design: the Nigerian digital divide between urban and rural schools, and between states in terms of ICT infrastructure investment, demands that the system remain accessible via low-end web browsers without high-end hardware requirements.

---

## 2.3 Knowledge Retrieval Architectures for AI-Powered Tutors

### 2.3.1 The Hallucination Problem and the Case for RAG

One of the most significant limitations of general-purpose LLMs in educational settings is their tendency to generate confident but factually incorrect responses—a phenomenon widely termed "hallucination" (Kumar et al., 2023, as cited in Alves et al., 2025). In tutoring contexts, hallucinated content is particularly harmful: students are unlikely to independently verify AI-generated claims, and incorrect explanations can entrench misconceptions (Helal et al., 2024, as cited in Alves et al., 2025). This creates an urgent technical and pedagogical imperative: LLM-powered tutors must be *grounded* in verified, curriculum-aligned knowledge sources.

**Retrieval-Augmented Generation (RAG)** has emerged as the leading architectural solution to this problem. RAG augments an LLM's generative process by retrieving semantically relevant passages from a curated knowledge base before generating a response, thereby constraining the model's output to content that is both contextually appropriate and factually verifiable (Lewis et al., 2020). Dong (2023) demonstrated that a RAG-based AI tutor can adapt to arbitrary course content while maintaining answer accuracy, provided the underlying knowledge base is curated with sufficient precision.

### 2.3.2 Multimodal Knowledge Graph–Enhanced ITS

A 2026 study published in *Frontiers in Computer Science* (Pang et al., 2026) presents a technically advanced architecture for an ITS that combines automatic knowledge graph construction with RAG. In this system, curriculum content is first processed into a structured knowledge graph—capturing conceptual entities, their attributes, and inter-concept relationships—and stored in a graph database (Neo4j). Simultaneously, text chunks are vectorized and stored in a vector database (Milvus) for dense semantic retrieval. At inference time, a multi-hop graph traversal enriches the context retrieved for any learner query, enabling responses that reflect not just surface-level text similarity but deep conceptual relationships within the domain.

The results reported by Pang et al. (2026) are significant: the multimodal knowledge graph–RAG system achieved higher answer accuracy and greater conceptual coherence compared to plain RAG or fine-tuned LLM baselines, particularly for complex, multi-step reasoning questions. For NedAI, this architecture serves as a validated technical benchmark. While NedAI's current implementation employs vector-based RAG over a curated corpus of NERDC-aligned curriculum materials, the knowledge graph layer represents a clear and principled direction for future development.

### 2.3.3 Knowledge Vaults and Curriculum Alignment

A practical implication of the RAG paradigm is the need for a structured, maintainable **knowledge vault**—a repository of curriculum-aligned documents that the retrieval system can query. For NedAI, this knowledge vault is composed of FMoE/NERDC-approved learning materials, including approved textbook content, Scheme of Work documents, and past examination resources from the West African Examinations Council (WAEC) and the National Examinations Council (NECO), organized by education level and subject area. This design ensures that the AI tutor's responses are anchored to the specific learning objectives, terminologies, and assessment formats that Nigerian students encounter in their actual classrooms and public examinations—a feature conspicuously absent from general-purpose AI tools such as ChatGPT or Google Gemini.

Banjade et al. (2024) argue that the alignment of AI tutoring content to an approved curriculum is a non-negotiable requirement for educational deployment, not merely a desirable enhancement. They note that responses generated outside of the curriculum scope risk introducing concepts that students are not yet developmentally prepared to engage with, potentially undermining rather than supporting classroom instruction. NedAI's knowledge vault design directly responds to this concern by ensuring strict content provenance.

---

## 2.4 Emotional Intelligence and Safety in AI–Learner Interactions

### 2.4.1 The Affective Dimension of Learning

A robust body of research in educational psychology demonstrates that learning is not a purely cognitive process—it is deeply intertwined with learners' emotional states. The **Control–Value Theory of achievement emotions** (Pekrun, 2006) posits that students' achievement emotions (enjoyment, anxiety, boredom, pride) arise from their appraisals of perceived control over academic activities and the value they assign to those activities. These emotions, in turn, substantially predict engagement, self-regulation, and academic performance.

Wang and Xu (2025) investigated the sequential mediation pathway linking **emotional intelligence (EI)**, **willingness to communicate (WTC)**, and **foreign language learning boredom (FLLB)** among 1,158 EFL undergraduates. Their structural equation modeling confirmed that EI positively predicts WTC (β = 0.415, *p* < .001), WTC negatively predicts FLLB (β = −0.153, *p* < .001), and FLLB strongly and negatively predicts academic performance (β = −0.343, *p* < .001). The total model explained 26.1% of the variance in language learning outcomes—a practically significant finding underscoring the importance of designing AI tutors that actively support learners' emotional states alongside their cognitive processing.

For NedAI, which targets Nigerian students navigating English as an official but often non-primary language of instruction across a linguistically diverse nation of over 500 indigenous languages (Ethnologue, 2023), these findings are directly actionable. Nigerian learners frequently experience language-related anxiety and communicative reluctance in formal academic settings, particularly in English-medium examinations such as WAEC and JAMB. The system is designed to provide emotionally supportive, non-judgmental responses that validate learner effort, reduce anxiety, and maintain engagement through positive reinforcement strategies, operationalized through the conversational persona of "Ned."

### 2.4.2 Pedagogical Safety Benchmarks for AI Tutors

The integration of LLMs into tutoring presents not only opportunities but also documented safety risks. Mu et al. (2025) introduced **SafeTutors**, a comprehensive benchmark for evaluating pedagogical safety in AI tutoring systems. Drawing on a dataset of multi-turn tutoring dialogues across 11 harm dimensions and 48 sub-risk categories, the benchmark reveals that current state-of-the-art LLMs—including GPT-4o and Claude 3.5 Sonnet—fail to maintain pedagogically safe interactions in a measurable proportion of sessions. Identified risks span categories including: providing direct answers that undermine learning (bypassing productive struggle), promoting dependency, delivering emotionally dismissive feedback, providing developmentally inappropriate content, and generating factually incorrect explanations without disclaimer.

SafeTutors is notable for its emphasis on *multi-turn* safety—the observation that risks often do not manifest in a single exchange but emerge across a sequence of interactions as the tutor-student relationship evolves. This finding has direct implications for NedAI's architecture: the system maintains full conversation context across turns, and its safety guidelines are applied holistically to the dialogue as a continuous thread rather than evaluated on a response-by-response basis.

### 2.4.3 Emotional Safety in LLM-Based Conversational Systems

Pinzuti et al. (2025) investigated the capacity of LLMs to detect and classify emotionally unsafe content across a six-category taxonomy: violence and hate, sexual content, guns and illegal weapons, regulated substances, suicide and self-harm, and criminal planning. A critical finding was that **lightweight fine-tuned models (1B parameters) can achieve performance comparable to models 70 times larger** (70B parameters) in emotional safety classification tasks, using less than 2GB of VRAM at inference—making privacy-preserving, on-device safety monitoring a technically viable option even in resource-constrained environments.

For NedAI, which is designed to serve minors in Nigerian primary and secondary school settings, this research validates the feasibility of embedding emotionally safe interaction as an intrinsic property of the system rather than treating it as an optional post hoc moderation layer. The NedAI system prompt explicitly defines boundary behaviors: the AI persona will redirect harmful or off-curriculum queries, maintain age-appropriate language at all times, and escalate to a human teacher interface flag when the student's expressed distress exceeds a configurable threshold.

---

## 2.5 Policy and Regulatory Context: AI-Assisted Learning in Nigeria

### 2.5.1 The Nigerian Education System: A Continuum from Crèche to PhD

Nigeria operates a multi-tiered education system spanning six distinct levels, each governed by a dedicated regulatory framework under the overarching authority of the Federal Ministry of Education (FMoE):

**Early Childhood Care and Development Education (ECCDE)** — encompassing crèche, nursery, and kindergarten — is governed by the *National Policy on Early Childhood Care and Development* and the Universal Basic Education Commission (UBEC). This foundational tier addresses children from birth to age five and is recognized as critical for cognitive and socio-emotional development prior to formal schooling.

**Basic Education (Primary 1–6 and Junior Secondary School 1–3)** is regulated by UBEC under the *Compulsory, Free Universal Basic Education Act (2004)* and delivered through the **9-Year Basic Education Curriculum (9-BEC)** developed by the National Educational Research and Development Council (NERDC). This tier serves learners from approximately ages six to fifteen.

**Senior Secondary Education (SS1–SS3)** follows the **Senior Secondary School Curriculum (SSSC)** and culminates in high-stakes public examinations administered by the West African Examinations Council (WAEC) and the National Examinations Council (NECO). University entrance is further mediated by the Joint Admissions and Matriculation Board (JAMB) Unified Tertiary Matriculation Examination (UTME).

**Technical and Vocational Education and Training (TVET)** at the post-secondary level is governed by the **National Board for Technical Education (NBTE)**, which accredits polytechnics, monotechnics, and technical colleges offering National Diploma (ND) and Higher National Diploma (HND) programmes.

**College of Education programmes**, leading to the Nigeria Certificate in Education (NCE), are regulated by the **National Commission for Colleges of Education (NCCE)**, which sets minimum standards for teacher education institutions across the federation.

**University Education** — spanning undergraduate (B.Sc./B.A./B.Eng.), postgraduate (M.Sc./M.A./MBA), and doctoral (PhD) levels — is accredited and quality-assured by the **National Universities Commission (NUC)**, which issues the Benchmark Minimum Academic Standards (BMAS) for all programmes offered by Nigerian universities, both conventional and distance-learning institutions such as the National Open University of Nigeria (NOUN).

NedAI's knowledge vault is organized to span this full continuum: NERDC-aligned syllabi and WAEC/NECO/JAMB past questions for pre-tertiary learners; NUC BMAS subject outlines and research methodology resources for undergraduate and postgraduate students; and NBTE/NCCE programme frameworks for vocational and teacher education learners.

### 2.5.2 Federal Policy on Digital and AI-Assisted Learning

Nigeria's engagement with educational technology has been formalized through a series of federal policy instruments. The **National Policy on Education (NPE, 2013, revised 2023)** affirms the role of ICT as a cross-cutting tool for instructional delivery at all levels of the education system—from ECCDE through postgraduate study. The **National Digital Economy Policy and Strategy (NDEPS, 2020–2030)**, spearheaded by the Federal Ministry of Communications and Digital Economy, establishes digital inclusion and e-learning infrastructure as national priorities. The NUC's **e-Learning Regulatory Framework for Nigerian Universities** and the success of the **National Open University of Nigeria (NOUN)**—which serves over 650,000 learners across all 36 states via distance and blended learning—further demonstrate the federal government's commitment to technology-mediated education at scale across all tiers.

NedAI is developed with explicit attention to these policy requirements and to Nigeria's data protection framework. The **Nigeria Data Protection Act (NDPA, 2023)**—which establishes the Nigeria Data Protection Commission (NDPC) as the primary regulatory authority—mandates that any digital system collecting or processing personal data must obtain informed consent, minimize data collection, and implement appropriate technical and organizational safeguards. In compliance, NedAI collects no personally identifiable information beyond session authentication tokens, does not retain conversation logs beyond session expiry unless explicitly authorized by an institution's administrator, and implements tiered content guardrails: stricter age-appropriate filters for ECCDE and primary-level users aligned with the **Child Rights Act (2003)**, and progressively broader academic content access for secondary, tertiary, and postgraduate learners.

### 2.5.3 The Learning Crisis Across the Education Continuum

Nigeria's educational quality indicators present a compelling case for urgent, scalable intervention across every tier. At the early childhood level, UNICEF (2022) estimates that fewer than 30% of Nigerian children under five benefit from any organized early learning programme, severely limiting school readiness and long-term academic trajectories. Although Nigeria has made significant progress in school enrollment since the adoption of the Universal Basic Education Act in 2004—with net enrollment in basic education exceeding 85% by 2020 (UBEC, 2021)—enrollment gains have not translated proportionally into learning achievement.

At the primary level, findings from the **Progress in International Reading Literacy Study (PIRLS 2021)** revealed that the majority of Nigerian Grade 4 students did not reach the Low International Benchmark (400 points) in reading literacy—placing Nigeria among the lowest-performing participant nations (Mullis et al., 2023). At the secondary level, the 2023 WAEC Senior School Certificate Examination recorded that approximately 50.3% of candidates failed to obtain credits in five subjects including Mathematics and English simultaneously (WAEC, 2023)—a persistent structural failure that constrains access to tertiary education for millions of Nigerian youth annually.

At the tertiary level, Nigeria's approximately 170 accredited universities (NUC, 2023) collectively enroll over two million students, yet face severe shortfalls in qualified academic staff, library resources, and digital research infrastructure. Postgraduate research capacity is similarly constrained: the ratio of PhD-holding faculty to total student enrollment remains far below UNESCO's recommended benchmark. AI-powered tutoring and research-assistance systems—when curriculum-aligned, emotionally safe, and spanning the full educational continuum—offer a scalable, cost-effective pathway to providing the individualized academic support that every tier of the Nigerian education system urgently requires.

---

## 2.6 Gaps in Existing Systems and the Distinctive Contribution of NedAI

A review of the existing ITS landscape reveals several persistent and interrelated gaps that directly motivate the development of NedAI:

### 2.6.1 Lack of Curriculum Localization

The majority of commercially available and research-grade ITS platforms—including Khan Academy, Carnegie Learning's MATHia, and Duolingo—are designed for Western curricula (U.S. Common Core, European frameworks) and assume instructional contexts that differ markedly from the Nigerian education landscape. Nigerian learners at every level encounter content that does not align with the scope or pacing of their respective Nigerian curricula: NERDC/UBEC syllabi for ECCDE and basic education; NERDC/WAEC/NECO frameworks for secondary education; NUC Benchmark Minimum Academic Standards for university programmes; and NBTE/NCCE frameworks for technical and teacher education. No commercially available AI tutoring system is currently mapped across this full continuum of Nigerian educational frameworks.

### 2.6.2 Insufficient Attention to Emotional Context

As documented by SafeTutors (Mu et al., 2025) and the EI research literature (Wang & Xu, 2025), the emotional dimensions of learner experience are frequently underweighted in ITS design. Systems optimized for answer correctness often fail to provide the type of emotionally validating, encouragement-oriented feedback that motivates continued engagement—particularly among students who have internalized a history of academic failure or examination anxiety. NedAI's persona design and response templates are explicitly informed by research on emotional intelligence and its role in sustaining willingness to communicate and reducing foreign language learning boredom.

### 2.6.3 Hallucination and Factual Reliability

General-purpose LLMs, when used without retrieval grounding, frequently generate plausible but incorrect educational content (Alves et al., 2025; Dong, 2023). For Nigerian students preparing for high-stakes public examinations (WAEC, NECO, JAMB), where even minor factual inaccuracies can translate into exam failure, the absence of factual grounding in an AI tutor represents an unacceptable academic risk. NedAI's RAG architecture—anchored to a curated, NERDC/WAEC-aligned knowledge vault—directly addresses this gap by constraining responses to verified curriculum materials and past examination content.

### 2.6.4 Accessibility and Infrastructure Constraints

Nigeria's diverse infrastructure landscape presents significant challenges for digital learning deployment. Irregular electricity supply, limited broadband penetration in rural states, and a large share of students accessing the internet exclusively via low-end mobile devices demand that any educational technology platform be designed for resilience. NedAI is built as a progressive, browser-based application that requires no native installation, minimizes client-side computational load, and supports graceful degradation under low-bandwidth conditions. A companion **desktop application** (NedAI Desktop) further extends this reach by enabling **local AI model inference** via Ollama and phi-3 mini, allowing fully offline tutoring for students and schools without reliable internet connectivity.

---

## 2.7 Synthesis and Theoretical Framework

The development of NedAI is grounded in the synthesis of four theoretical and empirical frameworks:

1. **The ITS Architecture Framework** (Alves et al., 2025; Pang et al., 2026): Provides the technical scaffold for adaptive, AI-powered instruction, with RAG-based knowledge retrieval as the core mechanism for curriculum alignment and hallucination mitigation.

2. **The Control–Value Theory of Achievement Emotions** (Pekrun, 2006; Wang & Xu, 2025): Informs the design of NedAI's conversational persona and response strategies, prioritizing emotional validation and engagement maintenance alongside cognitive scaffolding—particularly relevant for Nigerian learners navigating English-medium instruction and high-stakes examination culture.

3. **The SafeTutors Pedagogical Safety Framework** (Mu et al., 2025): Provides a taxonomy of 11 pedagogical harm dimensions and 48 sub-risk categories that inform NedAI's system prompt design, content guardrails, and escalation logic in compliance with the Nigerian Child Rights Act (2003).

4. **The Nigerian Multi-Tier Education Policy Framework** (FMoE, 2023; NERDC, 2023; NUC, 2023; NBTE; NCCE; NDPA, 2023): Anchors the system's content layer to nationally mandated competencies across the full education continuum—from ECCDE crèche curricula through to NUC Benchmark Minimum Academic Standards for postgraduate research—and ensures regulatory compliance with Nigeria's data protection legislation and child safety law.

Together, these frameworks position NedAI not merely as a general-purpose AI chatbot deployed in a school context, but as a purposefully designed, evidence-based intelligent tutoring system that integrates technical rigor, pedagogical intention, emotional sensitivity, and local Nigerian policy alignment into a cohesive and scalable educational tool.

---

## References

Alves, P., Santos, J., & Ribeiro, L. (2025). Advancing education through tutoring systems: A systematic literature review. *arXiv preprint arXiv:2503.09748*. https://arxiv.org/html/2503.09748v1

Banjade, S., Patel, H., & Pokhrel, S. (2024). Empowering education by developing and evaluating generative AI-powered tutoring system for enhanced student learning. *Journal of Artificial Intelligence and Capsule Networks, 6*(3), 278–298.

Dong, C. (2023). How to build an AI tutor that can adapt to any course and provide accurate answers using large language model and retrieval-augmented generation. *arXiv preprint arXiv:2311.17696*.

Ethnologue. (2023). *Languages of Nigeria* (27th ed.). SIL International. https://www.ethnologue.com/country/NG/

Federal Ministry of Education (FMoE). (2013). *National Policy on Education* (6th ed.). NERDC Press.

Federal Ministry of Education (FMoE). (2016). *National Policy on Early Childhood Care and Development Education*. NERDC Press.

Federal Ministry of Education (FMoE). (2023). *Revised National Policy on Education*. NERDC Press.

Federal Republic of Nigeria. (2003). *Child Rights Act 2003*. Federal Government of Nigeria.

Federal Republic of Nigeria. (2004). *Compulsory, Free Universal Basic Education Act*. Federal Government of Nigeria.

Federal Republic of Nigeria. (2023). *Nigeria Data Protection Act 2023*. National Information Technology Development Agency (NITDA).

Ines, S.-G., Ani, G., & Angelina, G. (2024). Twenty-five years of Bayesian knowledge tracing: A systematic review. *User Modeling and User-Adapted Interaction*, 1–47.

Kulik, J. A., & Fletcher, J. D. (2016). Effectiveness of intelligent tutoring systems: A meta-analytic review. *Review of Educational Research, 86*(1), 42–78.

Lin, C.-C., Huang, A. Y., & Lu, O. H. (2023). Artificial intelligence in intelligent tutoring systems toward sustainable education: A systematic review. *Smart Learning Environments, 10*(1), Article 41.

Ma, W., Adesope, O. O., Nesbit, J. C., & Liu, Q. (2014). Intelligent tutoring systems and learning outcomes: A meta-analysis. *Journal of Educational Psychology, 106*(4), 901–918.

Maity, S., & Deroy, A. (2024). Generative AI and its impact on personalized intelligent tutoring systems. *arXiv preprint arXiv:2410.10650*.

Mousavinasab, E., Zarifsanaiey, N., Niakan Kalhori, S. R., Rakhshan, M., Keikha, L., & Ghazi Saeedi, M. (2021). Intelligent tutoring systems: A systematic review of characteristics, applications, and evaluation methods. *Interactive Learning Environments, 29*(1), 142–163.

Mu, T., Zhang, K., & Chen, W. (2025). SafeTutors: Benchmarking pedagogical safety in AI tutoring systems. *arXiv preprint arXiv:2504.xxxxx*.

Mullis, I. V. S., Martin, M. O., Foy, P., Kelly, D. L., & Fishbein, B. (2023). *PIRLS 2021 International Results in Reading*. TIMSS & PIRLS International Study Center, Boston College.

National Board for Technical Education (NBTE). (2022). *Curriculum and Course Specifications for National Diploma and Higher National Diploma Programmes*. NBTE Press.

National Commission for Colleges of Education (NCCE). (2022). *Minimum Standards for Nigeria Certificate in Education Programmes*. NCCE Press.

National Educational Research and Development Council (NERDC). (2023). *Senior Secondary School Curriculum: Revised Edition*. NERDC Press.

National Universities Commission (NUC). (2023). *Benchmark Minimum Academic Standards (BMAS) for undergraduate and postgraduate programmes in Nigerian universities*. NUC Press.

National Universities Commission (NUC). (2022). *List of Accredited Universities in Nigeria*. NUC. https://www.nuc.edu.ng/

Pang, L., Liu, Y., & Zhang, H. (2026). Research on an intelligent tutoring system based on automatic construction of multimodal knowledge graphs and retrieval-augmented generation. *Frontiers in Computer Science, 8*, Article 1540398. https://doi.org/10.3389/fcomp.2026.1540398

Pekrun, R. (2006). The control-value theory of achievement emotions: Assumptions, corollaries, and implications for educational research and practice. *Educational Psychology Review, 18*(4), 315–341. https://doi.org/10.1007/s10648-006-9029-9

Pinzuti, E., Tüscher, O., & Castro, A. F. (2025). Comparative performance of large language models in emotional safety classification across sizes and tasks. *Frontiers in Artificial Intelligence, 8*, Article 1706090. https://doi.org/10.3389/frai.2025.1706090

Swargiary, K. (2024). The impact of AI-driven personalized learning and intelligent tutoring systems on student engagement and academic achievement: Ethical implications and the digital divide. *SSRN Preprint No. 4897241*.

UNESCO Institute for Statistics. (2023). *Nigeria education statistics: Pupil-teacher ratios in basic education*. UNESCO. https://uis.unesco.org/

UNICEF Nigeria. (2022). *Early childhood development in Nigeria: Situation analysis*. UNICEF. https://www.unicef.org/nigeria/

Universal Basic Education Commission (UBEC). (2021). *Annual Report on Universal Basic Education in Nigeria*. UBEC Press.

Wang, R., & Xu, Q. (2025). Emotional intelligence and language learning performance of EFL learners in China: Chain mediating effects of willingness to communicate and foreign language learning boredom. *Frontiers in Psychology, 16*, Article 1702948. https://doi.org/10.3389/fpsyg.2025.1702948

West African Examinations Council (WAEC). (2023). *West African Senior School Certificate Examination (WASSCE) Chief Examiner's Report and Statistics*. WAEC Nigeria.
