import { format } from 'date-fns';

// eslint-disable-next-line import/prefer-default-export
export function dateToString(date) {
  if (!date) return '';

  return format(date, 'yyyy年M月d日 HH時mm分');
}

export function translateErrors(code) {
  const error = { title: 'エラー', description: '時間をおいてお試しください' };

  switch (code) {
    // for ログイン
    case 'auth/invalid-mail': {
      error.description = 'メールアドレスが不正です';
      break;
    }
    case 'auth/user-disabled': {
      error.description = 'アカウントが無効です';
      break;
    }
    case 'auth/user-notfound':
    case 'auth/wrong-password': {
      error.description = 'メールアドレス、またはパスワードに誤りがあります';
      break;
    }
    // for 会員登録
    case 'auth/email-already-in-use': {
      error.description = 'メールアドレスが使用されています';
      break;
    }
    case 'auth/operation-not-allowed': {
      error.description = '開発者にお問い合わせください';
      break;
    }
    case 'auth/weak-password': {
      error.description = 'パスワードが簡単すぎます';
      break;
    }
    default:
  }
  return error;
}
