
'use client';

import { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import Cropper from 'react-easy-crop';
import type { Area, Point } from 'react-easy-crop/types';
import { getCroppedImg } from '@/lib/canvasUtils';
import { useToast } from '@/hooks/use-toast';
import { RotateCcw, Upload } from 'lucide-react';
import { AvatarImage } from './ui/avatar';

interface AvatarEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAvatar: string;
  onAvatarSave: (newAvatarUrl: string) => void;
}

export default function AvatarEditorDialog({
  open,
  onOpenChange,
  currentAvatar,
  onAvatarSave,
}: AvatarEditorDialogProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const { toast } = useToast();

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const showCroppedImage = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      onAvatarSave(croppedImage);
      onOpenChange(false);
      resetState();
       toast({
        title: 'Avatar Atualizado!',
        description: 'Sua nova foto de perfil foi salva com sucesso.',
      });
    } catch (e) {
      console.error(e);
       toast({
        variant: 'destructive',
        title: 'Erro ao recortar',
        description: 'Não foi possível salvar a imagem. Tente novamente.',
      });
    }
  }, [imageSrc, croppedAreaPixels, rotation, onAvatarSave, onOpenChange, toast]);
  
  const resetState = () => {
    setImageSrc(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setRotation(0);
    setCroppedAreaPixels(null);
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      resetState();
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Editar Foto de Perfil</DialogTitle>
          <DialogDescription>
            Faça o upload, ajuste o zoom, a rotação e recorte sua nova imagem.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="relative w-full h-[300px] bg-muted rounded-md overflow-hidden">
            {imageSrc ? (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
              />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <AvatarImage src={currentAvatar} alt="Avatar atual" className="h-32 w-32 rounded-full ring-2 ring-muted-foreground/20" />
                    <p className="text-sm text-muted-foreground mt-4">Nenhuma imagem nova selecionada.</p>
                </div>
            )}
          </div>

          {imageSrc && (
            <div className='space-y-4'>
                <div className='space-y-2'>
                    <Label htmlFor="zoom">Zoom</Label>
                    <Slider
                        id="zoom"
                        min={1}
                        max={3}
                        step={0.1}
                        value={[zoom]}
                        onValueChange={(val) => setZoom(val[0])}
                    />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor="rotation">Rotação</Label>
                     <Slider
                        id="rotation"
                        min={0}
                        max={360}
                        step={1}
                        value={[rotation]}
                        onValueChange={(val) => setRotation(val[0])}
                    />
                </div>
            </div>
          )}
        </div>
        
        <DialogFooter className='grid grid-cols-2 gap-2 sm:grid-cols-2'>
            <Button asChild variant="outline">
                <label htmlFor="avatar-upload" className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    {imageSrc ? 'Alterar Imagem' : 'Escolher Imagem'}
                    <input type="file" id="avatar-upload" className="sr-only" onChange={handleFileChange} accept="image/*" />
                </label>
            </Button>
            <Button onClick={showCroppedImage} disabled={!imageSrc}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function readFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result as string), false);
    reader.readAsDataURL(file);
  });
}
