export interface WriteupLink {
  Title: string;
  Link: string;
}

export interface Writeup {
  Links: WriteupLink[];
  Authors: string[];
  Programs: string[];
  Bugs: string[];
  Bounty: string;
  PublicationDate: string;
  AddedDate: string;
  id?: string; // For internal use
  read?: boolean; // For tracking read status
}

export interface WriteupData {
  data: Writeup[];
}

export interface ProcessedWriteup extends Omit<Writeup, 'Links'> {
  id: string;
  title: string;
  link: string;
  tags: string;
  programs: string;
  authors: string;
  bounty: string;
  publicationDate: string;
  addedDate: string;
  read: boolean;
}

export interface FilterState {
  search: string;
  selectedTags: string[];
  selectedPrograms: string[];
  selectedAuthors: string[];
  readStatus: 'all' | 'read' | 'unread';
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}