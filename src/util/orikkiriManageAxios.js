import axios from 'axios';

// 환경 변수에서 기본 URL을 가져옵니다.
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Axios의 인스턴스를 생성합니다.
export const instance = axios.create({
    baseURL: BASE_URL,
});

// Axios 요청 인터셉터를 설정합니다.
instance.interceptors.request.use(
    // 요청 전달되기 전 작업을 처리합니다.
    (config) => {
        // 토큰을 가져옵니다.
        const token = localStorage.getItem('token');
        console.log('로컬스토리지에서 토큰을 가져옵니다', token);

        // 토큰이 존재하면 요청 헤더에 Authorization 헤더를 추가하여 토큰을 전송합니다.
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            console.log('react에서 spring으로 토큰을 헤더에 담아서 보냈습니다.');
            console.log(config);
        }

        // 처리된 config를 반환합니다.
        return config;
    },
    // 요청 에러가 있는 작업을 처리합니다.
    (error) => {
        // 에러가 발생하면 콘솔에 에러 로그를 출력합니다.
        console.error(error);

        // 에러를 Promise를 통해 다음 핸들러로 전파합니다.
        return Promise.reject(error);
    }
);

// 우리끼리 생성 함수
export const addOrikkiri = async (orikkiriDTO) => {
    console.log(orikkiriDTO);
    return await instance.post('/orikkiriManage/addOrikkiri', { orikkiriDTO });
};

// 우리끼리 수정 함수
export const updateOrikkiri = async (orikkiriDTO) => {
    console.log(orikkiriDTO);
    return await instance.post('/orikkiriManage/updateOrikkiri', { orikkiriDTO });
};

// 우리끼리 질문 추가 함수
export const addAnsQuestion = async (addAnsQuestionDTO) => {
    console.log(addAnsQuestionDTO);
    return await instance.post('/orikkiriManage/addAnsQuestion', { addAnsQuestionDTO });
};
// 현재 로그인한 사용자의 프로필 정보를 불러오는 함수
export const getMember = async (tag) => {
    return await instance.get(`/orikkiriManage/updateOrikkiri/${tag}`);
};