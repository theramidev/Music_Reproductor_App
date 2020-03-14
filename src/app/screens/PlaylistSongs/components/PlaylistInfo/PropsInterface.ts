import { MPlaylist } from '../../../../models/playlist.model';

export interface IProps {
    playlist: MPlaylist | null,
    quantitySongs: number,
    onDelete(): void,
    onEdit(): void,
    onAdd(): void
}