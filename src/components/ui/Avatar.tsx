import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@utils/helpers'
import { AVATARS } from '@data/avatars'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  avatarId?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'circle' | 'square'
  fallback?: React.ReactNode
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, avatarId, size = 'md', shape = 'circle', fallback, ...props }, ref) => {
    const sizes = {
      xs: 'w-6 h-6 text-caption',
      sm: 'w-8 h-8 text-body-sm',
      md: 'w-10 h-10 text-body',
      lg: 'w-12 h-12 text-body-lg',
      xl: 'w-16 h-16 text-heading-lg',
    }

    const shapes = {
      circle: 'rounded-full',
      square: 'rounded-lg',
    }

    const avatar = avatarId ? AVATARS.find(a => a.id === avatarId) : null

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center overflow-hidden bg-graphite-800 flex-shrink-0',
          sizes[size],
          shapes[shape],
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="w-full h-full object-cover"
          />
        ) : avatar ? (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: avatar.bgColor }}
          >
            <div dangerouslySetInnerHTML={{ __html: avatar.svg }} />
          </div>
        ) : fallback ? (
          fallback
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-graphite-700 text-slate-400">
            <svg className="w-1/2 h-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export interface AvatarGroupProps {
  avatars: (AvatarProps & { id: string })[]
  max?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function AvatarGroup({ avatars, max = 5, size = 'md', className }: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max)
  const remainingCount = avatars.length - max

  return (
    <div className={cn('flex -space-x-2', className)} aria-label={`${avatars.length} people`}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={avatar.id}
          {...avatar}
          size={size}
          className={cn('ring-2 ring-graphite-950', index === 0 && 'z-10', className)}
        />
      ))}
      {remainingCount > 0 && (
        <Avatar
          size={size}
          className="ring-2 ring-graphite-950 bg-graphite-700 text-slate-400 font-medium"
          fallback={+remainingCount}
        />
      )}
    </div>
  )
}