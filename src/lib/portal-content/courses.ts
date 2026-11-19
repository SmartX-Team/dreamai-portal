export type Category = "All" | "Core" | "AgenticAI" | "DT&Robot";

export interface Course {
  id: number;
  category: Exclude<Category, "All">;
  title: string;
  duration: string;
  level: "체험" | "집중" | "심화";
  imageUrl?: string;
  description?: string;
  curriculum?: string[];
  tools?: string[];
  formUrl?: string;
  isRegistrationOpen?: boolean;
}

export const defaultCourses: Course[] = [
    {
      id: 1,
      category: "AgenticAI",
      title: "꿈꾸는아이(AI) 훈련 플랫폼을 활용한 초거대 생성형AI 실증",
      duration: "1일 4시간",
      level: "체험",
      imageUrl: "/images/training/genai-2.png",
      description: "초거대 생성형AI 실증 교육을 통해 전문성 역량 강화 ",
      curriculum: [
        "Agent 개발환경 구축과 LLM 호출 및 Tool calling 기초",
        "스스로 판단하고 행동하는 Agent 만들기",
        "나만의 Agent 완성하기",
      ],
      tools: ["ChatGPT API", "Tiny-Llama", "SD Turbo"],
      formUrl:
        "https://docs.google.com/forms/d/1BbAEsh7KXpb73HFrSDwBup8WZkEDB7IcMuoOCWCrFfM/edit",
      isRegistrationOpen: true,
    },
    {
      id: 2,
      category: "DT&Robot",
      title: "Omniverse·Cosmos·Isaac Sim 통합으로 디지털트윈 시작하기",
      duration: "1일 4시간",
      level: "집중",
      imageUrl: "/images/training/dt-robot-5.png",
      description:
        "Omniverse·OpenUSD 기반 Sim2Real Digital Twin과 SimReady 자산을 활용하여, 로봇 및 자율자동차 훈련을 위한 디지털트윈 구축과 Physital Digital Twin 기반 검증 흐름 이해",
      curriculum: [
        "Isaac Sim 기반의 Sim2Real Digital Twin 시작을 위한 Omniverse와 OpenUSD ",
      ],
      tools: ["NVIDIA Omniverse", "MobileX Pole"],
      formUrl: "https://forms.gle/9FtH9dtoTJ1GVdtE6",
      isRegistrationOpen: true,
    },
    {
      id: 3,
      category: "DT&Robot",
      title:
        "SimReady Digital Twin 구축과 활용을 위한 3D Asset 생성과 가상통합",
      duration: "1일 4시간",
      level: "집중",
      imageUrl: "/images/training/dt-robot-5.png",
      description:
        "Omniverse·OpenUSD 기반 Sim2Real Digital Twin과 SimReady 자산을 활용하여, 로봇 및 자율자동차 훈련을 위한 디지털트윈 구축과 Physital Digital Twin 기반 검증 흐름 이해",
      curriculum: [
        "SimReady Digital Twin 구축과 활용을 위한 3D Asset 생성과 가상통합",
      ],
      tools: ["NVIDIA Omniverse", "MobileX Pole"],
      formUrl: "https://forms.gle/9FtH9dtoTJ1GVdtE6",
      isRegistrationOpen: true,
    },
    {
      id: 4,
      category: "DT&Robot",
      title: "Pysital Digital Twin 기반 로봇 • 자율시스템 Sim2Real 실증 실습",
      duration: "1일 4시간",
      level: "집중",
      imageUrl: "/images/training/dt-robot-5.png",
      description:
        "Omniverse·OpenUSD 기반 Sim2Real Digital Twin과 SimReady 자산을 활용하여, 로봇 및 자율자동차 훈련을 위한 디지털트윈 구축과 Physital Digital Twin 기반 검증 흐름 이해",
      curriculum: ["로봇 및 자율차 훈련을 조율하는 Physital Digital Twin"],
      tools: ["NVIDIA Omniverse", "MobileX Pole"],
      formUrl: "https://forms.gle/9FtH9dtoTJ1GVdtE6",
      isRegistrationOpen: true,
    },
    {
      id: 5,
      category: "DT&Robot",
      title: "꿈꾸는아이(AI) Digital Twin 직무혁신",
      duration: "1일 4시간",
      level: "체험",
      imageUrl: "/images/training/dt-robot-4.png",
      description:
        "꿈꾸는아이(AI) 훈련 플랫폼을 활용한 Digital Twin 교육을 통해 전문성 역량 강화",
      curriculum: [
        "꿈꾸는아이(AI) Digital Twin을 통한 X+AI 서비스 관제",
        "Digital Twin을 위한 현실세계 데이터의 3D 변환",
        "인공지능 서비스 실현을 위한 Digital Twin 소개",
      ],
      tools: ["Dream-AI Space", "NVIDIA Omniverse", "Isaac Sim"],
      formUrl:
        "https://docs.google.com/forms/d/e/1FAIpQLSfmRoizZeST4lXxnCWVxHkjRaxOIztU_R7LXc8QB_ewZgSpaQ/viewform?usp=sharing&ouid=104372961309486815190",
      isRegistrationOpen: false,
    },
    {
      id: 6,
      category: "DT&Robot",
      title: "디지털트윈 환경 구축과 시뮬레이션 실습 과정",
      duration: "1일 4시간",
      level: "집중",
      imageUrl: "/images/training/dt-robot-2.png",
      description:
        "OpenUSD–Omniverse–AI Surrogate 모델–SimReady 자산을 통합 활용하여 디지털트윈의 설계–시뮬레이션–실증(Sim-to-Real) 전 과정을 학습하는 산업 실증형 전문인재 양성 과정",
      curriculum: [
        "OpenUSD Omniverse 기반으로 시작하는 Sim2Real Digital Twin",
        "SimReady Digital Twin 구축과 활용을 위한 3D Asset 생성과 가상통합",
        "로봇과 자율자동차 훈련을 위한 가상/실제 연동 Physital Digital Twin",
      ],
      tools: ["NVIDIA Omniverse", "MobileX Pole"],
      formUrl:
        "https://docs.google.com/forms/d/e/1FAIpQLSfmRoizZeST4lXxnCWVxHkjRaxOIztU_R7LXc8QB_ewZgSpaQ/viewform?usp=sharing&ouid=104372961309486815190",
      isRegistrationOpen: false,
    },
    {
      id: 7,
      category: "DT&Robot",
      title: "Omniverse 기반 Sim2Real Digital Twin 실습",
      duration: "2일 4시간/일 (총 8시간)",
      level: "심화",
      imageUrl: "/images/training/dt-robot-3.png",
      description:
        "OpenUSD–Omniverse–AI Surrogate 모델–SimReady 자산을 통합 활용하여 디지털트윈의 설계–시뮬레이션–실증(Sim-to-Real) 전 과정을 학습하는 산업 실증형 전문인재 양성 과정",
      curriculum: [
        "특화분야 AX 대응을 위한 가상과 실제를 연계하는 Digital Twin",
        "OpenUSD Omniverse 기반으로 시작하는 Sim2Real Digital Twin",
        "Omniverse (Cosmos & Issac) 개발&활용 환경 구축",
        "SimReady Digital Twin 구축과 활용을 위한 3D Asset 생성과 가상통합",
        "로봇과 자율자동차 훈련을 위한 가상/실제 연동 Physital Digital Twin",
      ],
      tools: ["NVIDIA Omniverse", "SimReady"],
      formUrl:
        "https://docs.google.com/forms/d/e/1FAIpQLSfmRoizZeST4lXxnCWVxHkjRaxOIztU_R7LXc8QB_ewZgSpaQ/viewform?usp=sharing&ouid=104372961309486815190",
      isRegistrationOpen: false,
    },
    /*
    {
      id: 8,  
      category: "DT&Robot",
      title: "디지털트윈 기반 X+AI 서비스 구조 이해 및 가상 통합 개념",
      duration: "1일 4시간",
      level: "집중",
      imageUrl: "/images/training/dt-robot-1.png",
      description: "디지털트윈 기반 AI Space 인프라와 D-N-A 구조를 활용한 X+AI 교육 서비스의 운영 방식과 가상 시설 통합 개념을 이해하고, AI 교육A훈련 환경에서 디지털트윈이 수행하는 역할과 확장 가능성을 체계적으로 학습",
      curriculum: [ "꿈꾸는 아이(AI) Space 인프라 기반 X+AI 서비스 실증", "Omniverse OpenUSD 기반 Pysital Digital Twin과 Sim2Real 환경 이해"],
      tools: ["NVIDIA Omniverse", "OpenUSD"],
      formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSftuj2FpvS3j5b4amztjyF6VDfqtIRvzigxOIJbwJYVaVOpJA/viewform",
      isRegistrationOpen: false
    },
    {
      id: 9,
      category: "AgenticAI",
      title: "에이전트 아키텍처 이론과 응용 설계",
      duration: "1일 4시간",
      level: "집중",
      imageUrl: "/images/training/genai-1.png",
      description:  "생성형 AI 모델을 설계하고, 이를 바탕으로 스스로 판단하고 행동하는 에이전트(Agent) 시스템을 구축하는 이론 및 응용 실습",
      curriculum: [ "생성형 AI(Generative AI) 모델의 아키텍처 설계 및 원리 이해", "멀티 에이전트(Multi-Agent) 시스템의 개념과 응용", "LLM 기반의 자율형 AI 서비스 구현 및 API 연동 실습"],
      tools: ["Agentic AI", "Multi-Agent Systems", "LLM"],
      formUrl: "https://forms.gle/zonwWwVSNK1HDPGfA",
      isRegistrationOpen: false
    },
    {
      id: 10,
      category: "Core",
      title: "Model Zoo1: Python 기반 AI 이해 및 데이터 시각화 실습",
      duration: "1일 4시간",
      level: "체험",
      imageUrl: "/images/training/core-1.png",
      description: "AI 개발의 기초 역량을 강화하고 Python을 활용한 기술 이해와 실습 능력 향상",
      curriculum: [ "AI 실습 환경 세팅 및 Python을 활용한 AI 이해 및 체험", "CNN 모델 학습부터 추론까지의 과정 실습", "음성, 시계열, 이미지 등 다양한 데이터의 이해 및 시각화"],
      tools: ["CNN","Python" ],
      formUrl: "https://forms.google.com/your-form-3",
      isRegistrationOpen: false
    },
    {
      id: 11,
      category: "Core",
      title: "Model Zoo2: 초거대 AI와 클라우드 인프라 기반 X+AI 융합 서비스 이해",
      duration: "1일 4시간",
      level: "체험",
      imageUrl: "/images/training/core-2.png",
      description: "초거대 AI와 LLM 기초를 다지고, 이를 지원하는 클라우드 인프라 및 D-N-A 기반 융합 서비스 이해",
      curriculum: ["초거대 AI 시대를 여는 LLM(대규모 언어 모델) 기초 및 파운데이션 모델 이해", "Agentic AI의 개념과 활용 및 LLM 추론", "D-N-A(Data, Network, AI) 인프라(데이터센터)와 클라우드 기술 구조 이해"],
      tools: ["LLM", "Agentic AI", "D-N-A Infrastructure"],
      formUrl: "https://forms.google.com/your-form-4",
      isRegistrationOpen: false
    },
    {
      id: 12,
      category: "Core",
      title: "AI Playground1: 수학으로 접근하는 기계학습",
      duration: "1일 4시간",
      level: "체험",
      imageUrl: "/images/training/core-3.png",
      description: "기계학습(ML)의 핵심이 되는 수학적 원리를 이해하고, 지도 및 비지도 학습 모델을 직접 구현해보는 기초 실습",
      curriculum: ["선형회귀와 오차, 경사하강법 등 머신러닝 수학 기초", "로지스틱 회귀 및 신경망(Neural Networks) 구조 이해", "비지도 학습의 개념과 K-means 알고리즘 실습"],
      tools: ["Machine Learning", "Linear/Logistic Regression"],
      formUrl: "https://forms.google.com/your-form-5",
      isRegistrationOpen: false
    },
    {
      id: 13,
      category: "Core",
      title: "AI Playground2: 신뢰할 수 있는 데이터 엔지니어링과 LLM 이해 및 실습",
      duration: "1일 4시간",
      level: "체험",
      imageUrl: "/images/training/core-4.png",
      description: "LLM의 핵심인 트랜스포머 구조를 실습하고, 고품질 AI 개발을 위한 신뢰할 수 있는 데이터 엔지니어링(수집·저장·관리) 기술 습득",
      curriculum: ["LLM과 트랜스포머(Transformer) 구조의 이해 및 모델 실습", "믿을 수 있는 데이터 축적의 중요성과 메타데이터(Metadata) 활용", "데이터 활용을 위한 저장 형식, 데이터 레이크(Data Lake) 및 레이크하우스 이해"],
      tools: ["LLM", "Transformer"],
      formUrl: "https://forms.google.com/your-form-6",
      isRegistrationOpen: false
    },
    {
      id: 14,
      category: "Core",
      title: "Impact AI Hackathon",
      duration: "1일 16시간",
      level: "체험",
      imageUrl: "/images/training/core-5.png",
      description: "사회 문제 해결을 주제로 실제 AI 서비스를 기획·개발하며 실전 문제 해결 능력과 협업 역량을 키우는 프로젝트형 해커톤",
      curriculum: ["사회 문제 정의 및 AI 기반 해결 아이디어 도출 (Ideation)", "팀 빌딩 및 AI 서비스 프로토타입 개발 (Mentoring)", "최종 결과물 발표 및 시연 (Presentation)"],
      tools: ["자유 선택"],
      formUrl: "https://forms.google.com/your-form-7",
      isRegistrationOpen: false
    },
    {
      id: 15,
      category: "Core",
      title: "DLI DAY",
      duration: "1일 4시간",
      level: "체험",
      imageUrl: "/images/training/core-6.png",
      description: "NVIDIA의 글로벌 AI 인증 프로그램과 연계하여 딥러닝 및 GPU 병렬처리 기술을 실습하고, 초거대 AI 모델 운영 능력을 배양",
      curriculum: [ "딥러닝(Deep Learning)의 기초 이론 및 원리 학습", "GPU 병렬처리 기술 및 고성능 컴퓨팅(HPC) 활용 실습", "NVIDIA DLI 인증 평가 및 자격 취득"],
      tools: ["NVIDIA DLI", "Deep Learning", "HPC"],
      formUrl: "https://forms.google.com/your-form-8",
      isRegistrationOpen: false
    },
    {
      id: 16,
      category: "Core",
      title: "MobileX Station 기반 AI 서비스 구현 교육",
      duration: "1일 4시간",
      level: "체험",
      imageUrl: "/images/training/core-7.png",
      description: "AI 서비스 구현 능력 기반 교육을 통해 전문성 역량 강화 ",
      curriculum: ["AI대학원 꿈꾸는 아이(AI) Space 인프라 및 D-N-A 기반 X+AI 서비스 개념 및 원리", "대형 언어 모델(LLM) 기반 프롬프트 엔지니어링 이론", "Omniverse 도구 기반 디지털 트윈(Digital Twin) 개념 및 원리"],
      tools: ["GAN", "Diffusion Models", "NVIDIA Omniverse"],
      formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc3-FS3GwN_2J73gTQAdcyXnrCoJkk-uIXQd0XYG6PahQQkpA/viewform?usp=header",
      isRegistrationOpen: false 
    },
    */
  ];
