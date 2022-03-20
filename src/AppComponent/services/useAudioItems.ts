import {
  doc,
  query,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '../../repositories/firebase';
import { AudioItem } from '..';

const COLLECTION = 'audioItems';

const useAudioItems = () => {
  const [audioItems, setAudioItems] = useState<AudioItem[]>([]);

  useEffect(() => {
    const q = query(collection(db, COLLECTION));
    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        const audioItems: AudioItem[] = [];
        querySnapshot.forEach((doc) => {
          audioItems.push(doc.data() as AudioItem);
        });
        setAudioItems(audioItems);
      },
      (error) => console.warn(error)
    );
    return () => unsub();
  }, []);

  const addAudioItem = (audioItem: AudioItem) => {
    console.log(`add audio item`);
    setDoc(doc(db, COLLECTION, audioItem.id), { ...audioItem });
  };

  const deleteAudioItem = (id: string) => {
    console.log(`delete audio item`);
    deleteDoc(doc(db, COLLECTION, id));
  };
  return { addAudioItem, deleteAudioItem, audioItems };
};
export default useAudioItems;
