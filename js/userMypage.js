const tabList = Array.from(document.querySelectorAll('.tab'))

tabList.forEach((button) => {
    button.addEventListener('click', handleSortButtonClick)
})

function handleSortButtonClick(event) {
    const clickedTab = event.target

    tabList.forEach((button) => {
        button.classList.remove('active')
        if (button === clickedTab) {
            button.classList.add('active')
        } else {
            button.classList.remove('active')
        }
    })

    var tab1 = document.getElementsByClassName('tab1')[0]
    var tab2 = document.getElementsByClassName('tab2')[0]
    var tab3 = document.getElementsByClassName('tab3')[0]
    if (clickedTab.id === 'tab1') {
        tab1.style.display = 'block'
        tab2.style.display = 'none'
        tab3.style.display = 'none'
    } else if (clickedTab.id === 'tab2') {
        tab1.style.display = 'none'
        tab2.style.display = 'block'
        tab3.style.display = 'none'
    } else if (clickedTab.id === 'tab3') {
        tab1.style.display = 'none'
        tab2.style.display = 'none'
        tab3.style.display = 'block'
    }
}

//리뷰수정완료 누르면 바로 tab3으로 이동하기 위한 함수
function activateTab(tabId) {
    const tabToActivate = document.getElementById(tabId)
    if (tabToActivate) {
        handleSortButtonClick({ target: tabToActivate })
    }
}

// URL에서 쿼리 파라미터 추출하는 함수
function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search)
    return urlSearchParams.get(name)
}

// 페이지가 로드될 때 실행되는 이벤트 리스너
window.addEventListener('load', function () {
    // completeCreateReview 함수에서 넘어온 URL 파라미터를 확인
    const sourcePage = getQueryParam('source')

    if (sourcePage === 'completeCreateReview') {
        // 이전 페이지가 completeCreateReview일 경우 함수 a 실행
        handleSortButtonClick(tab3)
    }
})

// 수정 및 삭제 storemypage에서 가져옴

// 페이지 이동 (수정 완료 버튼)
function completeCreateReview() {
    window.location.href = 'makeReivewmodify.html' // 리뷰수정.html로 이동
}
/*
document
    .getElementById('moveEditMyBt')
    .addEventListener('click', completeCreatePromotion)
*/

// 리뷰 삭제 버튼
function deleteReview() {
    window.location.href = 'userMypage.html' // mypage.html로 이동
}

document.getElementById('delete').addEventListener('click', deleteReview)

//

// 내 정보 수정하기
document.addEventListener('DOMContentLoaded', function () {
    const moveEditMyBt = document.querySelector('.moveEditMyBt')
    const tab1 = document.querySelector('#tab1')
    const myInfo = document.querySelector('.myInfo')
    let editing = false

    moveEditMyBt.addEventListener('click', function () {
        if (!editing) {
            tab1.classList.add('active')

            const infoItems = myInfo.querySelectorAll('div')

            infoItems.forEach((item) => {
                const img = item.querySelector('img')
                const text = item.textContent

                const input = document.createElement('input')
                input.type = 'text'
                input.value = text

                item.innerHTML = ''
                item.appendChild(img.cloneNode(true))
                item.appendChild(input)
            })

            moveEditMyBt.textContent = '수정 완료'
            editing = true
        } else {
            const infoItems = myInfo.querySelectorAll('div')

            infoItems.forEach((item) => {
                const img = item.querySelector('img')
                const input = item.querySelector('input')
                const text = input.value

                item.innerHTML = ''
                item.appendChild(img.cloneNode(true))
                item.appendChild(document.createTextNode(text))
            })

            moveEditMyBt.textContent = '내 정보 수정하기'
            editing = false
        }
    })
})

// 댓글 삭제 ajax

// 댓글 삭제 ajax
function deleteComment(commentIdx) {
    $.ajax({
        url: '/comment/${commentIdx}',
        type: 'DELETE',
        success: function (response) {
            if (response.code === 200) {
                console.log('댓글 삭제 성공:', response.message)
            } else {
                console.error('댓글 삭제 실패:', response.message)
            }
        },
        error: function (xhr, status, error) {
            console.error('댓글 삭제 오류:', error)
        },
    })
}

document.querySelector('.deleteBt').addEventListener('click', function () {
    const commentIdx = 123

    deleteComment(commentIdx)
})
