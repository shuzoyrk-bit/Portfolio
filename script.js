// ==========================================
// オモコロ風ポートフォリオ インタラクション制御スクリプト
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------
  // 0. スマホ用ハンバーガーメニュー開閉制御
  // ------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        menuIcon.className = 'fa-solid fa-bars';
      } else {
        mobileMenu.classList.remove('hidden');
        menuIcon.className = 'fa-solid fa-xmark';
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.className = 'fa-solid fa-bars';
      });
    });
  }

  // ------------------------------------------
  // 1. 応援（イイネ）連打ボタン & 紙吹雪 (Confetti)
  // ------------------------------------------
  const cheerBtn = document.getElementById('cheerBtn');
  const cheerCount = document.getElementById('cheerCount');
  let currentLikes = 999;

  cheerBtn.addEventListener('click', (e) => {
    currentLikes++;
    cheerCount.textContent = currentLikes;

    // クリック位置または画面中央から紙吹雪を飛ばす
    const rect = cheerBtn.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    if (window.confetti) {
      window.confetti({
        particleCount: 25,
        spread: 60,
        origin: { x, y },
        colors: ['#ef4444', '#facc15', '#38bdf8', '#a855f7', '#22c55e']
      });
    }

    // ポップな拡大縮小リアクション
    cheerBtn.style.transform = 'scale(1.25) rotate(-5deg)';
    setTimeout(() => {
      cheerBtn.style.transform = '';
    }, 150);
  });


  // ------------------------------------------
  // 2. 実績カテゴリフィルタリング
  // ------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // アクティブ切り替え
      filterBtns.forEach(b => {
        b.classList.remove('active-filter');
        b.classList.remove('bg-yellow-400');
        b.classList.add('bg-white');
      });
      btn.classList.add('active-filter');
      btn.classList.add('bg-yellow-400');
      btn.classList.remove('bg-white');

      const filter = btn.getAttribute('data-filter');

      workCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // ------------------------------------------
  // 3. 作品詳細モーダルウィンドウ
  // ------------------------------------------
  const modal = document.getElementById('workModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalTech = document.getElementById('modalTech');
  const modalDesc = document.getElementById('modalDesc');
  const modalIcon = document.getElementById('modalIcon');
  const modalLink = document.getElementById('modalLink');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const closeModalBottomBtn = document.getElementById('closeModalBottomBtn');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  function openModal(data) {
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalTech.textContent = data.tech;
    modalDesc.textContent = data.desc;
    modalLink.href = data.link || '#';
    modalIcon.className = `fa-solid ${data.icon || 'fa-laptop-code'}`;

    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('opacity-0');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 200);
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const data = {
        title: btn.getAttribute('data-title'),
        subtitle: btn.getAttribute('data-subtitle'),
        tech: btn.getAttribute('data-tech'),
        desc: btn.getAttribute('data-desc'),
        link: btn.getAttribute('data-link'),
        icon: btn.getAttribute('data-icon')
      };
      openModal(data);
    });
  });

  closeModalBtn.addEventListener('click', closeModal);
  closeModalBottomBtn.addEventListener('click', closeModal);

  // 背景クリックで閉じる
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Escキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });


  // ------------------------------------------
  // 4. 今日のWeb開発アイディア無責任ルーレット
  // ------------------------------------------
  const ideas = [
    '「深夜の冷蔵庫を開けた瞬間、激怒のファンファーレが鳴るIoTアプリ」',
    '「GitHubの草（Contributions）が枯れると泣き声が届く育成ゲーム」',
    '「コードのインデントがズレていると画面が揺れて地震アラートが鳴るエディタ」',
    '「上司が背後に近づくと画面が一瞬でExcelのガントチャートに切り替わるステルス拡張」',
    '「自分をひたすら肯定してくれるAI音声付きの目覚まし時計Webアプリ」',
    '「『進捗どうですか？』と聞かれた時に使える言い訳100選を高速射出するマシーン」',
    '「タスクを完了するたびに画面いっぱいに焼肉がジュージュー焼ける演出が出るToDo」',
    '「世界中の『定時退社できた人』の人数をリアルタイム中継する癒やしダッシュボード」'
  ];

  const spinBtn = document.getElementById('spinBtn');
  const ideaDisplay = document.getElementById('ideaDisplay');

  let isSpinning = false;
  spinBtn.addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;

    let counter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * ideas.length);
      ideaDisplay.textContent = ideas[randomIndex];
      counter++;
      if (counter > 10) {
        clearInterval(interval);
        isSpinning = false;
        // ちょっとした紙吹雪
        if (window.confetti) {
          window.confetti({
            particleCount: 20,
            spread: 50,
            origin: { y: 0.7 }
          });
        }
      }
    }, 70);
  });


  // ------------------------------------------
  // 5. お問い合わせフォーム送信演出
  // ------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formSuccessMessage = document.getElementById('formSuccessMessage');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 送信風演出
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 送信中...';

    setTimeout(() => {
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> 送信する（気持ちが伝わります）';
      formSuccessMessage.classList.remove('hidden');

      if (window.confetti) {
        window.confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      setTimeout(() => {
        formSuccessMessage.classList.add('hidden');
      }, 5000);
    }, 800);
  });

});
