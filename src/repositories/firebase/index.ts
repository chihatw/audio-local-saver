import { getFirestore } from '@firebase/firestore';
import { initializeApp } from '@firebase/app';

import config from './config';

const firebaseApp = initializeApp(config);

export const db = getFirestore(firebaseApp);
