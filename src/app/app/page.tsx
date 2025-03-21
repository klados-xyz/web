'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreationsStore } from '@/store/creationsStore';
import AnimatedBackground from '@/components/app/AnimatedBackground';
import Button from '@/components/UI/Button';

import IconArrowRight from '@/../public/icons/arrow-right.svg';
import IconImport from '@/../public/icons/import.svg';

const Page = () => {
  const [title, setTitle] = useState<string>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const createCreation = useCreationsStore((state) => state.createCreation);
  const router = useRouter();

  const handleCreateProject = async () => {
    if (title.length < 3) return;

    setIsCreating(true);
    try {
      const newCreation = await createCreation(title);
      router.push(`/app/c/${newCreation.id}`);
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className={'relative flex h-full w-full items-center justify-center overflow-hidden'}>
      <div className={'z-[20] flex h-full w-full flex-col items-center justify-center gap-6 p-8'}>
        <p className={'text-center text-[36px] leading-[48px]'}>What do you want to create?</p>
        <div className={'flex w-full max-w-[720px] flex-col gap-3 rounded-[24px] border-1 border-neutral-100/10 bg-neutral-600/40 p-3 backdrop-blur-[64px]'}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type='text'
            placeholder={'Project Name...'}
            className={'w-full p-3 text-[24px] leading-[32px] font-medium outline-none placeholder:text-neutral-300'}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && title.length >= 3) {
                handleCreateProject();
              }
            }}
          />

          <div className={'flex w-full items-center justify-between gap-4 pl-3'}>
            <p>Klados v0.1</p>
            <div className={'flex items-center gap-2'}>
              <Button size={'lg'} variant={'secondary'}>
                <IconImport /> Import
              </Button>
              <Button size={'lg'} className={isCreating ? 'animate-pulse' : ''} disabled={title.length < 3 || isCreating} onClick={handleCreateProject}>
                Create Project
                <IconArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AnimatedBackground />
    </div>
  );
};

export default Page;
