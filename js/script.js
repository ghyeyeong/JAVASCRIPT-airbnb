//Fake json sever 숙소예제

//1. html요소
const roomList = document.querySelector("#roomList");

//2. 모든 지역 필터
const filterButtons = document.querySelectorAll('.filter-btn')

//전체 숙소를 저장할 변수
let rooms = []

//숙소 데이터 가져오기
function getRooms() {
    //데이터를 가져오는 동안 사용자에게 로딩메세지를 보여줌
    roomList.innerHTML = `
       <p class="message">숙소 정보를 불러오는 중입니다...</p>
    `;
    //json서버에서 데이터를 요청
    fetch('http://localhost:3000/rooms')
        .then(response => {
            console.log('서버응답:', response);

            if (!response.ok) {
                throw new Error(
                    '숙소 데이터를 가져오지 못했습니다.'
                );
            }
            return response.json();
        })
        .then(data => {
            console.log('data:', data);

            //서버에서 가져온 숙소데이터를 rooms 변수에 저장
            rooms = data;
            console.log('rooms', rooms)

            //숙소목록을 화면에 출력
            renderRooms(rooms)
        })
        .catch(error => {
            console.log(error)
            roomList.innerHTML = `<p class='message'>숙소 정보를 불러오지 못했습니다.</p>`;
        })
}

//숙소 데이터 - 화면UI구현
function renderRooms(roomData) {
    console.log('roomData', roomData)
    //이전에 출력된 숙소 데이터 지우기
    roomList.innerHTML = '';

    //만약 보여줄 숙소가 없다면 '해당 지역의 숙소가 없습니다'출력
    if (roomData.length === 0) {
        roomList.innerHTML = `<p class="message">해당 지역의 숙소가 없습니다</p>`
    }

    //숙소 배열을 하나씩 구현
    roomData.forEach(room => {
        roomList.innerHTML += `
        
            <article class="room-card">
                <div class="room-image">
                    <img
                        src="${room.image}"
                        alt="${room.title}"
                    >
                </div>

                <div class="room-info">
                    <h3 class="room-title">
                        ${room.title}
                    </h3>
                    <p class="room-location">
                        ${room.location}
                    </p>
                    <p class="room-rating">
                        ★ ${room.rating}
                    </p>
                    <p class="room-price">
                        <strong>
                            ${room.price.toLocaleString()}원
                        </strong>
                        / 박
                    </p>
                </div>
            </article>        
        `;

    })
}

filterButtons.forEach(button => {

    button.addEventListener('click', () => {

        const category = button.dataset.category;

        console.log('선택한 지역:', category);

        // 모든 버튼에서 active 제거
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // 클릭한 버튼에 active 추가
        button.classList.add('active');

        // 전체
        if (category === '전체') {
            renderRooms(rooms);
            return;
        }

        // 지역 필터
        const filteredRooms = rooms.filter(room => {
            return room.category === category;
        });
        renderRooms(filteredRooms);
    });

});
getRooms()



