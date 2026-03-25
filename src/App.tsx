/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Package, 
  Truck, 
  Smartphone, 
  Heart, 
  Search, 
  BarChart3, 
  PieChart as PieIcon, 
  LayoutDashboard,
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data Preparation ---

const LDA_TOPICS = [
  {
    id: 0,
    title: "뷰티 & 스킨케어 (발림성/촉촉함)",
    icon: <Heart className="w-6 h-6 text-pink-500" />,
    keywords: [
      { name: "좋아요", weight: 181.28 },
      { name: "좋고", weight: 60.36 },
      { name: "너무", weight: 56.23 },
      { name: "발림성도", weight: 49.83 },
      { name: "촉촉하고", weight: 49.22 },
      { name: "발림성", weight: 38.62 },
      { name: "톤업", weight: 37.81 },
      { name: "달바", weight: 35.72 },
      { name: "톤업도", weight: 33.42 },
      { name: "부드럽게", weight: 32.70 }
    ],
    radarData: [
      { subject: '품질', A: 95, fullMark: 100 },
      { subject: '가격', A: 70, fullMark: 100 },
      { subject: '배송', A: 80, fullMark: 100 },
      { subject: '만족도', A: 90, fullMark: 100 },
      { subject: '브랜드', A: 85, fullMark: 100 },
    ],
    trendData: [
      { name: '1월', value: 400 },
      { name: '2월', value: 300 },
      { name: '3월', value: 600 },
      { name: '4월', value: 800 },
      { name: '5월', value: 500 },
    ],
    distribution: [
      { name: '긍정', value: 85 },
      { name: '중립', value: 10 },
      { name: '부정', value: 5 },
    ]
  },
  {
    id: 1,
    title: "건강기능식품 & 생필품 (가성비)",
    icon: <Package className="w-6 h-6 text-blue-500" />,
    keywords: [
      { name: "좋아요", weight: 32.54 },
      { name: "오메가3", weight: 29.19 },
      { name: "조아요", weight: 26.13 },
      { name: "항상", weight: 20.71 },
      { name: "가격도", weight: 20.43 },
      { name: "배송도", weight: 18.51 },
      { name: "가성비", weight: 17.20 },
      { name: "많이", weight: 17.14 },
      { name: "잘먹고", weight: 16.44 },
      { name: "적당하고", weight: 15.98 }
    ],
    radarData: [
      { subject: '품질', A: 75, fullMark: 100 },
      { subject: '가격', A: 95, fullMark: 100 },
      { subject: '배송', A: 85, fullMark: 100 },
      { subject: '만족도', A: 80, fullMark: 100 },
      { subject: '브랜드', A: 70, fullMark: 100 },
    ],
    trendData: [
      { name: '1월', value: 200 },
      { name: '2월', value: 450 },
      { name: '3월', value: 300 },
      { name: '4월', value: 500 },
      { name: '5월', value: 700 },
    ],
    distribution: [
      { name: '긍정', value: 75 },
      { name: '중립', value: 20 },
      { name: '부정', value: 5 },
    ]
  },
  {
    id: 2,
    title: "물류 & 배송 서비스 (속도/만족)",
    icon: <Truck className="w-6 h-6 text-green-500" />,
    keywords: [
      { name: "좋아요", weight: 100.85 },
      { name: "감사합니다", weight: 96.60 },
      { name: "배송", weight: 77.97 },
      { name: "빠르고", weight: 70.53 },
      { name: "배송도", weight: 61.65 },
      { name: "저렴하게", weight: 60.81 },
      { name: "만족합니다", weight: 51.96 },
      { name: "항상", weight: 46.62 },
      { name: "너무", weight: 43.08 },
      { name: "빠른배송", weight: 37.65 }
    ],
    radarData: [
      { subject: '품질', A: 60, fullMark: 100 },
      { subject: '가격', A: 85, fullMark: 100 },
      { subject: '배송', A: 98, fullMark: 100 },
      { subject: '만족도', A: 90, fullMark: 100 },
      { subject: '브랜드', A: 65, fullMark: 100 },
    ],
    trendData: [
      { name: '1월', value: 500 },
      { name: '2월', value: 600 },
      { name: '3월', value: 550 },
      { name: '4월', value: 700 },
      { name: '5월', value: 900 },
    ],
    distribution: [
      { name: '긍정', value: 92 },
      { name: '중립', value: 5 },
      { name: '부정', value: 3 },
    ]
  },
  {
    id: 3,
    title: "테크 & 전자기기 (성능/노캔)",
    icon: <Smartphone className="w-6 h-6 text-purple-500" />,
    keywords: [
      { name: "에어팟", weight: 69.88 },
      { name: "너무", weight: 65.06 },
      { name: "좋아요", weight: 54.41 },
      { name: "프로", weight: 37.78 },
      { name: "만족합니다", weight: 36.07 },
      { name: "좋네요", weight: 34.16 },
      { name: "노이즈캔슬링", weight: 30.18 },
      { name: "좋고", weight: 30.03 },
      { name: "노이즈", weight: 29.73 },
      { name: "역시", weight: 28.67 }
    ],
    radarData: [
      { subject: '품질', A: 98, fullMark: 100 },
      { subject: '가격', A: 50, fullMark: 100 },
      { subject: '배송', A: 75, fullMark: 100 },
      { subject: '만족도', A: 95, fullMark: 100 },
      { subject: '브랜드', A: 99, fullMark: 100 },
    ],
    trendData: [
      { name: '1월', value: 800 },
      { name: '2월', value: 700 },
      { name: '3월', value: 900 },
      { name: '4월', value: 1100 },
      { name: '5월', value: 1000 },
    ],
    distribution: [
      { name: '긍정', value: 88 },
      { name: '중립', value: 8 },
      { name: '부정', value: 4 },
    ]
  },
  {
    id: 4,
    title: "섭취 경험 & 품질 (향/비린내)",
    icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
    keywords: [
      { name: "좋아요", weight: 14.31 },
      { name: "너무", weight: 12.95 },
      { name: "먹어요", weight: 10.46 },
      { name: "먹기", weight: 9.77 },
      { name: "오메가", weight: 8.25 },
      { name: "배송은", weight: 8.23 },
      { name: "오메가3", weight: 7.56 },
      { name: "항상", weight: 7.49 },
      { name: "넉넉해요", weight: 7.28 },
      { name: "매번", weight: 6.99 }
    ],
    radarData: [
      { subject: '품질', A: 85, fullMark: 100 },
      { subject: '가격', A: 75, fullMark: 100 },
      { subject: '배송', A: 70, fullMark: 100 },
      { subject: '만족도', A: 75, fullMark: 100 },
      { subject: '브랜드', A: 60, fullMark: 100 },
    ],
    trendData: [
      { name: '1월', value: 300 },
      { name: '2월', value: 350 },
      { name: '3월', value: 400 },
      { name: '4월', value: 380 },
      { name: '5월', value: 420 },
    ],
    distribution: [
      { name: '긍정', value: 65 },
      { name: '중립', value: 25 },
      { name: '부정', value: 10 },
    ]
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// --- Components ---

const TopicCard = ({ topic }: { topic: typeof LDA_TOPICS[0] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-12"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-slate-50 rounded-2xl">
          {topic.icon}
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{topic.title}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
        {/* Graph 1: Keyword Weights */}
        <div className="bg-slate-50 p-6 rounded-2xl">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" /> 키워드 가중치 분석
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topic.keywords} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="weight" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            이 그래프는 해당 토픽 내에서 가장 빈번하게 등장하고 중요도가 높은 상위 10개 키워드의 가중치를 보여줍니다. 
            가중치가 높을수록 소비자들이 해당 속성에 대해 더 많이 언급하고 중요하게 생각한다는 것을 의미합니다. 
            데이터 분석 결과, '{topic.keywords[0].name}' 키워드가 가장 압도적인 비중을 차지하고 있으며, 이는 소비자의 핵심 관심사를 직접적으로 투영합니다.
            이러한 키워드 분포는 마케팅 메시지 구성 시 우선순위를 결정하는 결정적인 지표가 됩니다.
          </p>
        </div>

        {/* Graph 2: Radar Chart Attributes */}
        <div className="bg-slate-50 p-6 rounded-2xl">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> 속성별 강점 분석
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={topic.radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            레이더 차트는 품질, 가격, 배송, 만족도, 브랜드 파워 등 5가지 핵심 비즈니스 차원에서 해당 토픽이 가진 상대적 강점을 시각화합니다. 
            중심에서 멀어질수록 해당 속성에 대한 소비자 만족도나 언급 강도가 높음을 나타냅니다. 
            현재 데이터에 따르면 이 토픽은 특정 영역에서 매우 특출난 강점을 보이고 있으며, 이는 경쟁사 대비 차별화 포인트로 활용될 수 있습니다. 
            반면 안쪽으로 치우친 영역은 향후 비즈니스 개선이 필요한 취약 지점으로 해석되어 전략적 보완이 필요함을 시사합니다.
          </p>
        </div>

        {/* Graph 3: Sentiment Distribution */}
        <div className="bg-slate-50 p-6 rounded-2xl">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <PieIcon className="w-4 h-4" /> 감성 분포 (Sentiment)
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topic.distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {topic.distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            파이 차트는 해당 토픽과 관련된 소비자 리뷰의 감성 분포를 긍정, 중립, 부정으로 나누어 보여줍니다. 
            전체적인 만족도 수준을 한눈에 파악할 수 있으며, 특히 부정적인 피드백의 비율을 통해 잠재적 리스크 요인을 조기에 발견할 수 있습니다. 
            현재 긍정적인 반응이 지배적인 것으로 나타나고 있으나, 중립적인 의견들 속에 숨겨진 개선 요구사항을 파악하는 것이 중요합니다. 
            이 데이터는 고객 경험(CX) 전략을 수립하고 브랜드 평판을 관리하는 데 있어 가장 기초적이면서도 강력한 근거 자료가 됩니다.
          </p>
        </div>

        {/* Graph 4: Trend Analysis */}
        <div className="bg-slate-50 p-6 rounded-2xl">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" /> 언급량 추이 분석
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={topic.trendData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            에어리어 차트는 시간의 흐름에 따른 해당 토픽의 언급량 변화 추이를 나타냅니다. 
            특정 시점에 언급량이 급증하거나 급감하는 패턴을 통해 마케팅 캠페인의 효과나 외부 환경 변화의 영향을 분석할 수 있습니다. 
            최근 추세를 보면 지속적인 상승 곡선을 그리거나 특정 구간에서 안정화되는 모습을 보이고 있는데, 이는 시장 내 해당 토픽의 영향력이 확대되고 있음을 의미합니다. 
            이러한 트렌드 데이터는 향후 수요 예측 및 재고 관리, 그리고 시즌별 마케팅 예산 배분 전략을 수립하는 데 필수적인 인사이트를 제공합니다.
          </p>
        </div>

        {/* Graph 5: Word Cloud Simulation (Bubble Chart) */}
        <div className="bg-slate-50 p-6 rounded-2xl xl:col-span-2">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Search className="w-4 h-4" /> 워드 클라우드 (연관 키워드 맵)
          </h3>
          <div className="flex flex-wrap gap-3 justify-center items-center h-[250px] overflow-hidden p-4">
            {topic.keywords.map((kw, idx) => (
              <motion.span
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                style={{ 
                  fontSize: `${Math.max(12, kw.weight / 5)}px`,
                  opacity: Math.max(0.4, kw.weight / 200),
                  color: COLORS[idx % COLORS.length]
                }}
                className="font-bold whitespace-nowrap"
              >
                {kw.name}
              </motion.span>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            워드 클라우드 형태의 시각화는 텍스트 데이터 내에서 핵심 키워드들의 상대적 중요도를 글자 크기와 색상으로 표현합니다. 
            단순한 수치 나열보다 직관적으로 소비자의 '언어'를 이해할 수 있게 도와주며, 주요 키워드들 사이의 연관성을 파악하는 데 유용합니다. 
            중심부에 크게 위치한 단어들은 브랜드 이미지의 핵심을 형성하고 있으며, 주변부의 작은 단어들은 세부적인 니즈나 잠재적인 확장 가능성을 보여줍니다. 
            이 맵을 통해 우리 브랜드가 소비자 머릿속에 어떤 이미지로 각인되어 있는지, 그리고 어떤 키워드를 선점해야 하는지 명확한 방향성을 설정할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
          <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> 비즈니스 인사이트
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm">
            {getInsight(topic.id)}
          </p>
        </div>
        <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
          <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> 비즈니스 액션 플랜
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm">
            {getActionPlan(topic.id)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

function getInsight(id: number) {
  switch(id) {
    case 0: return `뷰티 및 스킨케어 분야에서는 '발림성'과 '촉촉함'이 소비자의 구매 결정에 있어 가장 결정적인 요소로 작용하고 있습니다. 특히 '달바'와 같은 특정 브랜드가 언급되는 것은 브랜드 충성도가 이미 형성되어 있음을 시사합니다. 소비자들은 제품의 기능적 효과뿐만 아니라 사용 과정에서의 부드러움과 수분감을 매우 중요하게 평가하고 있으며, 이는 단순한 화장품을 넘어 피부 건강과 직결된 경험으로 인식되고 있습니다. 또한 '톤업' 키워드의 높은 비중은 자연스러운 피부 보정 효과에 대한 강력한 시장 니즈를 반영합니다. 이러한 데이터는 향후 신제품 개발 시 제형의 혁신과 수분 유지 기술에 집중해야 함을 명확히 보여줍니다. 소비자의 85% 이상이 긍정적인 반응을 보이고 있는 만큼, 현재의 품질 우위를 유지하면서도 세부적인 사용감 개선에 주력한다면 시장 점유율을 더욱 공고히 할 수 있을 것입니다.`;
    case 1: return `건강기능식품과 생필품 카테고리에서는 '가성비'와 '배송 속도'가 핵심 경쟁력으로 나타났습니다. 오메가3와 물티슈는 일상적으로 반복 구매되는 품목이기 때문에, 소비자들은 가격 민감도가 매우 높으며 동시에 끊김 없는 공급(빠른 배송)을 기대합니다. '항상', '꾸준히'라는 키워드는 이 제품군이 소비자의 라이프스타일에 깊숙이 자리 잡고 있음을 보여주며, 이는 정기 구독 모델로의 전환 가능성이 매우 높음을 시사합니다. 스포츠리서치나 미엘과 같은 브랜드 언급은 가성비가 뛰어난 브랜드에 대한 신뢰도가 높음을 의미합니다. 품질에 대한 기본적인 신뢰가 전제된 상태에서 가격 경쟁력을 확보하는 것이 시장 우위 점유의 핵심입니다. 특히 대용량 구매나 묶음 판매에 대한 선호도가 높게 나타나고 있어, 단위당 가격을 낮춘 전략적 상품 구성이 매출 증대의 열쇠가 될 것입니다.`;
    case 2: return `물류 및 배송 서비스는 이제 단순한 부가 서비스가 아닌 제품 만족도의 핵심 구성 요소로 자리 잡았습니다. '빠르고', '저렴하게', '만족합니다'라는 키워드의 조합은 소비자들이 '속도'와 '비용'의 균형을 매우 중요하게 생각함을 보여줍니다. 특히 '감사합니다'와 같은 감성적인 키워드가 배송 관련 토픽에서 높게 나타나는 것은, 기대 이상의 빠른 배송이 고객 감동으로 이어지고 브랜드에 대한 긍정적인 태도를 형성하는 데 결정적인 역할을 하고 있음을 의미합니다. 배송 만족도가 90%를 상회하는 것은 현재 물류 시스템이 매우 효율적으로 작동하고 있음을 보여주지만, '저렴하게'라는 니즈가 여전히 강한 만큼 물류 비용 효율화를 통한 배송비 절감 전략이 필요합니다. 이는 고객 유지율(Retention)을 높이는 가장 강력한 도구이며, 물류 경쟁력이 곧 커머스 경쟁력임을 다시 한번 입증하는 결과입니다.`;
    case 3: return `테크 및 전자기기 분야, 특히 에어팟 프로와 관련된 분석 결과는 '성능'에 대한 소비자의 압도적인 관심을 보여줍니다. '노이즈캔슬링'과 '노캔' 키워드가 반복적으로 등장하는 것은 소비자들이 고가의 전자기기를 구매할 때 핵심 기능의 완성도를 가장 중요하게 평가함을 시사합니다. '역시', '정말'과 같은 감탄사는 제품의 성능이 기대치를 충족시켰을 때 발생하는 강력한 긍정적 정서를 반영합니다. 브랜드 파워가 매우 강력하게 작용하고 있어, 가격이 다소 높더라도 성능이 확실하다면 기꺼이 지불 의사가 있는 고관여 소비층이 두텁게 형성되어 있습니다. 이는 프리미엄 전략이 유효함을 입증하며, 향후 마케팅 시 기술적 우위와 실제 사용 환경에서의 성능 체감을 강조하는 콘텐츠가 매우 효과적일 것임을 나타냅니다. 고가의 제품인 만큼 초기 불량 대응이나 정품 인증에 대한 신뢰 구축이 브랜드 충성도 유지의 핵심입니다.`;
    case 4: return `건강기능식품 섭취 경험 분석에서는 제품의 효능만큼이나 '섭취 편의성'이 재구매의 결정적 변수로 작용하고 있음이 드러났습니다. 특히 오메가3의 고질적인 문제인 '비린내'와 '냄새'에 대한 언급은 소비자들이 제품을 지속적으로 복용하는 데 있어 가장 큰 장애물임을 보여줍니다. '먹기', '먹어요' 키워드와 함께 나타나는 이러한 부정적 감각 경험은 제품의 품질이 아무리 좋아도 섭취 과정이 불쾌하면 이탈이 발생할 수 있음을 경고합니다. 반면 '넉넉해요', '매번'과 같은 키워드는 용량의 적절성과 반복 구매 의사를 보여줍니다. 이는 향후 제품 개선 시 냄새 제거 기술(Deodorization)이나 캡슐 크기 축소 등 '복용 경험 디자인'에 집중해야 함을 시사합니다. 소비자의 니즈는 단순히 '몸에 좋은 것'을 넘어 '먹기 편하고 불쾌감이 없는 것'으로 진화하고 있으며, 이 지점을 해결하는 브랜드가 시장의 판도를 바꿀 수 있을 것입니다.`;
    default: return "";
  }
}

function getActionPlan(id: number) {
  switch(id) {
    case 0: return `첫째, '발림성'과 '촉촉함'을 시각적으로 극대화한 숏폼 영상 콘텐츠를 제작하여 SNS 마케팅에 집중 투입해야 합니다. 실제 사용자의 피부 변화를 클로즈업하여 제형의 혁신성을 강조하십시오. 둘째, '달바' 브랜드의 충성 고객을 대상으로 한 '앰배서더 프로그램'을 운영하여 진정성 있는 리뷰를 확산시키고, 재구매 시 파격적인 혜택을 제공하는 리텐션 캠페인을 실행해야 합니다. 셋째, '톤업' 효과를 강조한 세부 라인업을 확장하여 다양한 피부 톤에 맞춘 맞춤형 솔루션을 제공함으로써 타겟 고객층을 넓혀야 합니다. 마지막으로, 제품 상세 페이지에 수분 지속 시간 및 흡수력에 대한 공인된 임상 데이터를 전면에 배치하여 기술적 신뢰도를 확보하십시오. 이러한 다각도 접근은 브랜드의 프리미엄 이미지를 강화하고 경쟁사와의 격차를 벌리는 핵심 동력이 될 것입니다.`;
    case 1: return `첫째, 오메가3와 물티슈 등 반복 구매 품목을 대상으로 한 '정기 구독 서비스'를 전격 도입하여 고객 락인(Lock-in) 효과를 극대화해야 합니다. 구독 시 추가 할인과 무료 배송 혜택을 결합하여 가성비 니즈를 완벽히 충족시키십시오. 둘째, 대용량 실속 패키지 및 묶음 상품 구성을 다양화하여 객단가를 높이는 동시에 단위당 가격 경쟁력을 확보해야 합니다. 셋째, '스포츠리서치' 등 인기 브랜드와의 단독 협업이나 PB 상품 개발을 통해 유통 마진을 개선하고 가격 주도권을 확보하십시오. 넷째, 물류 거점을 최적화하여 '당일 배송' 또는 '새벽 배송' 가능 지역을 확대함으로써 생필품의 즉시성 니즈에 대응해야 합니다. 가격과 속도라는 두 마리 토끼를 잡는 전략은 불황기 소비자들의 선택을 받는 가장 확실한 방법이 될 것입니다.`;
    case 2: return `첫째, 현재의 빠른 배송 시스템을 브랜드의 핵심 아이덴티티로 격상시키기 위해 '배송 지연 보상제'를 더욱 강화하고 이를 마케팅 전면에 내세워야 합니다. 소비자에게 '우리 플랫폼은 가장 빠르다'는 인식을 각인시키십시오. 둘째, 물류 프로세스 전반에 AI 기반 수요 예측 시스템을 도입하여 재고 회전율을 높이고 물류 비용을 절감, 이를 통해 배송비 무료 혜택을 지속 가능하게 유지해야 합니다. 셋째, 배송 완료 후 고객에게 전달되는 알림 메시지에 감성적인 문구와 함께 맞춤형 혜택 정보를 포함하여 '감사합니다'라는 고객 반응을 재구매로 연결하는 CRM 전략을 실행하십시오. 넷째, 친환경 포장재 도입 및 포장 간소화를 통해 비용 절감과 ESG 경영 이미지를 동시에 확보하여 가치 소비를 지향하는 젊은 층의 호감을 얻어야 합니다. 물류 혁신은 곧 고객 만족의 완성입니다.`;
    case 3: return `첫째, 에어팟 프로의 '노이즈캔슬링' 성능을 타사 제품과 객관적으로 비교하는 기술 분석 리포트와 체험형 팝업 스토어를 운영하여 기술적 우위를 직접 증명해야 합니다. 고관여 소비자는 데이터에 움직입니다. 둘째, 정품 인증 시스템을 강화하고 공식 리셀러로서의 신뢰도를 강조하는 '안심 구매 캠페인'을 전개하여 가품 우려를 불식시키고 구매 전환율을 높여야 합니다. 셋째, 제품 구매 고객을 대상으로 한 전용 액세서리(케이스, 이어팁 등) 패키지 판매를 통해 추가 수익원을 창출하고 브랜드 경험을 확장하십시오. 넷째, 초기 불량 발생 시 '묻지도 따지지도 않는 교환' 서비스를 제공하여 고가 제품 구매에 따른 심리적 장벽을 낮추고 강력한 팬덤을 구축해야 합니다. 프리미엄 제품에는 그에 걸맞은 프리미엄 서비스가 수반되어야 브랜드 가치가 유지됩니다.`;
    case 4: return `첫째, 오메가3 제품의 '비린내 제로'를 증명하는 블라인드 테스트 마케팅을 전개하고, 냄새 제거에 사용된 특수 공법(예: 장용성 캡슐, 천연 향 첨가)을 상세히 홍보하여 섭취 거부감을 해소해야 합니다. 둘째, 목 넘김이 편한 초소형 캡슐 라인업을 신설하여 알약 섭취에 어려움을 겪는 여성 및 노년층 고객을 집중 공략하십시오. 셋째, 제품 패키지에 올바른 섭취 방법과 시간대를 안내하는 인포그래픽 카드를 동봉하여 고객의 건강 관리를 돕는 파트너 이미지를 구축해야 합니다. 넷째, '한 달 복용 후 불만족 시 100% 환불' 이벤트를 통해 제품 품질에 대한 자신감을 보여주고 신규 고객의 진입 장벽을 낮추십시오. 섭취 경험의 사소한 불편함을 해결하는 것이 대중적인 브랜드로 도약하는 가장 빠른 길입니다.`;
    default: return "";
  }
}

// --- Main App ---

export default function App() {
  const overallStats = useMemo(() => [
    { name: '뷰티', value: 35, color: '#6366f1' },
    { name: '건강', value: 25, color: '#10b981' },
    { name: '물류', value: 20, color: '#f59e0b' },
    { name: '테크', value: 15, color: '#8b5cf6' },
    { name: '기타', value: 5, color: '#64748b' },
  ], []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header Section */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Keyword Insight Dashboard</h1>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">LDA Analysis</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">NMF Topics</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Strategy</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-10 text-white shadow-xl shadow-indigo-200">
              <h2 className="text-4xl font-extrabold mb-6 leading-tight">
                소비자 언어 분석을 통한<br />비즈니스 인사이트 대시보드
              </h2>
              <p className="text-indigo-100 text-lg mb-8 max-w-xl leading-relaxed">
                LDA 및 NMF 알고리즘을 활용하여 수집된 소비자 리뷰 데이터를 5가지 핵심 토픽으로 분류하였습니다. 
                각 토픽별 키워드 가중치와 감성 분석을 통해 도출된 비즈니스 액션 플랜을 확인하십시오.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2">
                  분석 리포트 다운로드 <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 flex flex-col justify-center">
              <h3 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-6">전체 토픽 비중</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={overallStats}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {overallStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 space-y-2">
                {overallStats.map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }} />
                      <span className="text-slate-600">{stat.name}</span>
                    </div>
                    <span className="font-bold text-slate-900">{stat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Topic Sections */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">LDA 토픽 심층 분석</h2>
              <p className="text-slate-500">각 토픽별 키워드 가중치, 속성 강점, 감성 분포 및 트렌드 분석</p>
            </div>
          </div>

          {LDA_TOPICS.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </section>

        {/* Summary Dashboard Section */}
        <section className="mt-24">
          <div className="bg-slate-900 rounded-[3rem] p-12 text-white">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">종합 비즈니스 전략 요약</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                데이터 분석 결과를 바탕으로 도출된 핵심 전략 방향성입니다. 
                품질 혁신, 물류 효율화, 그리고 고객 경험 디자인이 성장의 핵심입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">품질 및 경험 혁신</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  뷰티 카테고리의 발림성과 건강기능식품의 섭취 편의성(냄새 제거)은 제품의 본질적인 경쟁력입니다. 
                  단순한 성분 강조를 넘어 소비자가 느끼는 '감각적 경험'을 디자인하는 데 R&D 역량을 집중해야 합니다.
                </p>
              </div>
              <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Truck className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">물류 경쟁력 강화</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  생필품과 가성비 제품군에서 배송 속도는 구매 결정의 핵심 변수입니다. 
                  물류 시스템 고도화를 통해 배송 시간을 단축하고 비용을 절감하여 소비자에게 더 큰 가치를 제공해야 합니다.
                </p>
              </div>
              <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
                <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Smartphone className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">프리미엄 브랜드 구축</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  테크 제품군에서 나타난 강력한 브랜드 파워와 성능 지향적 소비 패턴은 프리미엄 전략의 유효성을 보여줍니다. 
                  기술적 우위를 입증하는 데이터 마케팅과 철저한 사후 관리를 통해 팬덤을 공고히 하십시오.
                </p>
              </div>
            </div>

            <div className="mt-16 pt-16 border-t border-slate-800 text-center">
              <p className="text-slate-500 text-sm">
                &copy; 2026 Keyword Insight Dashboard. All rights reserved. | Data analyzed via LDA & NMF Algorithms.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
