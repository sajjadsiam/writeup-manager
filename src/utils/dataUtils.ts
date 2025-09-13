import { WriteupData, ProcessedWriteup } from '@/types/writeup';

export function processWriteups(data: WriteupData): ProcessedWriteup[] {
  return data.data.map((writeup, index) => {
    const primaryLink = writeup.Links[0];
    return {
      id: `writeup-${index}`,
      title: primaryLink?.Title || 'Untitled',
      link: primaryLink?.Link || '',
      tags: writeup.Bugs.join(', '),
      programs: writeup.Programs.join(', '),
      authors: writeup.Authors.join(', '),
      bounty: writeup.Bounty === '-' ? 'No bounty' : `$${writeup.Bounty}`,
      publicationDate: writeup.PublicationDate,
      addedDate: writeup.AddedDate,
      read: writeup.read || false,
      Authors: writeup.Authors,
      Programs: writeup.Programs,
      Bugs: writeup.Bugs,
      Bounty: writeup.Bounty,
      PublicationDate: writeup.PublicationDate,
      AddedDate: writeup.AddedDate
    };
  });
}

export function getUniqueValues(writeups: ProcessedWriteup[], field: keyof ProcessedWriteup): string[] {
  const values = new Set<string>();
  
  writeups.forEach(writeup => {
    if (field === 'tags') {
      writeup.Bugs.forEach(bug => values.add(bug));
    } else if (field === 'programs') {
      writeup.Programs.forEach(program => values.add(program));
    } else if (field === 'authors') {
      writeup.Authors.forEach(author => values.add(author));
    }
  });
  
  return Array.from(values).sort();
}

export function filterWriteups(
  writeups: ProcessedWriteup[],
  searchTerm: string,
  selectedTags: string[],
  selectedPrograms: string[],
  selectedAuthors: string[],
  readStatus: 'all' | 'read' | 'unread',
  dateRange: { start: Date | null; end: Date | null }
): ProcessedWriteup[] {
  return writeups.filter(writeup => {
    // Search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        writeup.title.toLowerCase().includes(searchLower) ||
        writeup.authors.toLowerCase().includes(searchLower) ||
        writeup.tags.toLowerCase().includes(searchLower) ||
        writeup.programs.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Tags filter
    if (selectedTags.length > 0) {
      const hasMatchingTag = selectedTags.some(tag => 
        writeup.Bugs.includes(tag)
      );
      if (!hasMatchingTag) return false;
    }

    // Programs filter
    if (selectedPrograms.length > 0) {
      const hasMatchingProgram = selectedPrograms.some(program => 
        writeup.Programs.includes(program)
      );
      if (!hasMatchingProgram) return false;
    }

    // Authors filter
    if (selectedAuthors.length > 0) {
      const hasMatchingAuthor = selectedAuthors.some(author => 
        writeup.Authors.includes(author)
      );
      if (!hasMatchingAuthor) return false;
    }

    // Read status filter
    if (readStatus !== 'all') {
      if (readStatus === 'read' && !writeup.read) return false;
      if (readStatus === 'unread' && writeup.read) return false;
    }

    // Date range filter
    if (dateRange.start || dateRange.end) {
      const publicationDate = new Date(writeup.PublicationDate);
      
      if (dateRange.start && publicationDate < dateRange.start) {
        return false;
      }
      
      if (dateRange.end && publicationDate > dateRange.end) {
        return false;
      }
    }

    return true;
  });
}