import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSocialMember } from '../../util/memberAxios';
import { getCurrentPosition } from '../../util/Location';
import { useDispatch } from 'react-redux';
import { setMember } from '../../redux/modules/member';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [accessToken, setAccessToken] = useState('');

    // 쿠키에서 이름이 'Authorization'인 쿠키의 값을 가져오는 함수
    async function getCookieValue(cookieName) {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === cookieName) {
                return decodeURIComponent(value);
            }
        }
        return null;
    }

    useEffect(() => {
        const fetchCookieValue = async () => {
            const value = await getCookieValue('Authorization');
            setAccessToken(value);
        };

        fetchCookieValue();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokenDTO = {
                    accessToken: accessToken,
                };

                const response = await getSocialMember(tokenDTO);
                console.log(response.data)
                if (!response.data.nickname) {
                    // nickname이 없는 경우 oauth2Register로 라우팅
                    navigate('/oauth2Register');
                } else {
                    // nickname이 있는 경우 main으로 라우팅
                    dispatch(setMember(response.data));
                    navigate('/main');
                }
            } catch (err) {
                console.error('소셜로그인 에러', err);
                window.alert('로그인에 실패하였습니다.');
                navigate('/');
            }
        };

        if (accessToken) {
            fetchData();
        }
    }, [accessToken, navigate]);

    return <>sdfsdf</>;
};

export default OAuth2RedirectHandler;
